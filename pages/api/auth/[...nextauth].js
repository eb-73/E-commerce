import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { comparePass, connectToDatabase } from "../../../lib/db";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        //connect to database
        let client;
        try {
          client = await connectToDatabase();
        } catch {
          throw new Error("connect-to-database-failed");
        }
        //
        //check to find user exixst
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        console.log(user);
        if (!user) {
          client.close();
          throw new Error("user-not-found");
        }
        //
        //check password is correct
        const isEqual = await comparePass(credentials.pass, user.password);
        if (!isEqual) {
          client.close();
          throw new Error("password-is-incorrect");
        }
        client.close();
        return { email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

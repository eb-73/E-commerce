import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createUserGoogle } from "../../../lib/db";
import { comparePass, connectToDatabase } from "../../../lib/db";
export default NextAuth({
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        //connect to database
        let client;
        try {
          client = await connectToDatabase();
        } catch {
          throw new Error("connect-to-database-failed");
        }
        //
        // update email name for exists account
        if (credentials && credentials.newEmail && credentials.oldEmail) {
          const db = client.db();
          const updateUser = await db.collection("users").findOneAndUpdate(
            {
              email: credentials.oldEmail,
            },
            {
              $set: { email: credentials.newEmail },
            }
          );
          if (updateUser && updateUser.lastErrorObject.updatedExisting) {
            return {
              email: credentials.newEmail,
              id: updateUser.value._id.toString(),
            };
          } else throw new Error("user-not-found");
        }
        //
        //check to find user exixst
        if (credentials && credentials.email && credentials.pass) {
          let userToken;
          const db = client.db();
          const user = await db
            .collection("users")
            .findOne({ email: credentials.email });
          if (!user) {
            client.close();
            throw new Error("user-not-found");
          } else if (user && user._id)
            userToken = {
              id: user._id.toString(),
              email: user.email,
            };
          //
          //check password is correct
          const isEqual = await comparePass(credentials.pass, user.password);
          if (!isEqual) {
            client.close();
            throw new Error("password-is-incorrect");
          }
          client.close();
          return userToken;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (profile && account.provider === "google") {
        try {
          await createUserGoogle(profile.sub, profile.name, profile.email);
        } catch (err) {
          return "/unauthorized";
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.id;
      }
      return session;
    },
  },
  secret: process.env.SECRET,
});

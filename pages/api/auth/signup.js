import {
  connectToDatabase,
  hashedPassword,
  insertToCollection,
} from "../../../lib/db";

const signup = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  //validate form input
  const data = req.body;
  const { name, email, pass } = data;
  if (!email || !email.includes("@") || !email.includes(".com")) {
    res.status(422).json({ message: "email-is-incorrect" });
    return;
  }
  if (!pass || !pass.trim().length >= 8) {
    res.status(422).json({ message: "password-is-incorrect" });
    return;
  }
  //
  //connect to database
  let client;
  try {
    client = await connectToDatabase();
  } catch {
    res.status(500).json({ message: "connect-to-database-failed" });
    return;
  }

  //
  //find if user exist
  let userExist;
  try {
    const db = client.db();
    userExist = await db.collection("users").findOne({ email: email });
  } catch {
    res.status(500).json({ message: "connect-to-database-failed" });
    client.close();
    return;
  }

  if (userExist) {
    res.status(500).json({ message: "user-exists-already" });
    client.close();
    return;
  }
  //
  //insert user if not exixst

  //hash password
  const hashedPass = await hashedPassword(pass);
  //
  try {
    const result = await insertToCollection(client, "users", {
      name,
      email,
      password: hashedPass,
    });
    res.status(201).json({ message: "user-inserted" });
  } catch {
    res.status(500).json({ message: "insert-to-database-failed" });
  }
  //
  client.close();
};

export default signup;

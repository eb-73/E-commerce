import {
  comparePass,
  connectToDatabase,
  hashedPassword,
} from "../../../lib/db";
async function changePassword(req, res) {
  if (req.method === "PUT") {
    const { userEmail, oldPass, newPass } = req.body;
    let client;
    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(422).json({ message: "connect-to-database-failed" });
      return;
    }
    //check old pass is correct
    const db = client.db();
    const user = await db.collection("users").findOne({ email: userEmail });
    if (!user) {
      res.status(422).json({ message: "user-not-found" });
      client.close();
      return;
    }
    //check password is correct
    const isEqual = await comparePass(oldPass, user.password);
    if (!isEqual) {
      client.close();
      res.status(422).json({ message: "password-is-incorrect" });
      client.close();
      return;
    }
    const hashedPass = await hashedPassword(newPass);
    const update = await db
      .collection("users")
      .updateOne({ email: userEmail }, { $set: { password: hashedPass } });
    if (update.modifiedCount) {
      res.status(201).json({ message: "user-password-changed" });
      client.close();
      return;
    } else {
      res.status(411).json({ message: "password-change-unsuccess" });
      client.close();
      return;
    }
  }
}

export default changePassword;

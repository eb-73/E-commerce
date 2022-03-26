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
      res.status(500).json({ message: "connect-to-database-failed" });
      return;
    }
    try {
      //check user exist
      const db = client.db();
      const user = await db.collection("users").findOne({ email: userEmail });
      if (!user) {
        res.status(422).json({ message: "user-not-found" });
        client.close();
        return;
      }
      //check old pass is correct
      const isEqual = await comparePass(oldPass, user.password);
      if (!isEqual) {
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
      } else {
        res.status(411).json({ message: "password-change-unsuccess" });
        client.close();
        return;
      }
    } catch {
      res.status(411).json({ message: "password-change-failed" });
      client.close();
    }

    client.close();
  }
}

export default changePassword;

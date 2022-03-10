import { connectToDatabase } from "../../../lib/db";

async function user(req, res) {
  if (req.method === "PUT") {
    const { currentUserEmail, newEmail, newDateOfBrith, newLocation } =
      req.body;
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(411).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const user = await db
        .collection("users")
        .updateOne(
          { email: { currentUserEmail } },
          { $set: { dateOfBrith: newDateOfBrith, location: newLocation } }
        );
      if (user.modifiedCount)
        res.status(201).json({ message: "user-information-updated" });
      else res.status(411).json({ message: "user-not-found" });
    } catch {
      res.status(411).json({ message: "insert-data-failed" });
      client.close();
    }

    client.close();
  }
}

export default user;

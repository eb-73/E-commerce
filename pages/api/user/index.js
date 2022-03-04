import { connectToDatabase } from "../../../lib/db";

async function user(req, res) {
  if (req.method === "PUT") {
    const { currentUserEmail, newEmail, newDateOfBrith, newLocation } =
      req.body;
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(411).json({ message: "connect_to_database_failed" });
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
        res.status(201).json({ message: "user_information_updated" });
      else res.status(411).json({ message: "user_not_found" });
    } catch {
      res.status(411).json({ message: "insert_data_failed" });
      client.close();
    }

    client.close();
  }
}

export default user;

import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function user(req, res) {
  //put request
  if (req.method === "PUT") {
    const { currentUserEmail, newEmail, newDateOfBrith, newLocation } =
      req.body;
    console.log("current email", currentUserEmail);
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const user = await db
        .collection("users")
        .updateOne(
          { email: currentUserEmail },
          { $set: { dateOfBrith: newDateOfBrith, location: newLocation } }
        );
      if (user.matchedCount)
        res.status(201).json({ message: "user-information-updated" });
      else res.status(411).json({ message: "user-not-found" });
    } catch {
      res.status(411).json({ message: "insert-data-failed" });
      client.close();
    }

    client.close();
  }
  //delete request
  if (req.method === "DELETE") {
    let client;
    const { id } = req.query;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const deletedUser = await db
        .collection("users")
        .deleteOne({ _id: ObjectId(id) });
      const deletedOrder = await db
        .collection("orders")
        .deleteOne({ costumerId: id });
      if (deletedUser.deletedCount && deletedOrder.deletedCount)
        res.status(201).json({ message: "user-was-deleted" });
      else res.status(411).json({ message: "user-not-found" });
    } catch {
      res
        .status(411)
        .json({ message: "delete-user-failed-please-delete-again" });
      client.close();
    }

    client.close();
  }
  //get user id
  if (req.method === "GET") {
    const { userEmail } = req.query;
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const user = await db.collection("users").findOne({ email: userEmail });
      if (user) res.status(200).json({ userId: user._id.toString() });
      else res.status(411).json({ message: "user-not-found" });
    } catch {
      res.status(411).json({ message: "find-data-failed" });
      client.close();
    }

    client.close();
  }
}

export default user;

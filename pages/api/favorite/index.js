import { connectToDatabase } from "../../../lib/db";

async function favorite(req, res) {
  //get favorites
  if (req.method === "GET") {
    const { id } = req.query;
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const result = await db.collection("favorites").findOne({ userId: id });
      if (result) res.status(200).json({ favorite: result.favProducts });
      // else res.status(200).json({ message: "favorite-products-not-found" });
    } catch {
      res.status(411).json({ message: "find-favorites-failed" });
      client.close();
    }
    client.close();
  }
  //update favorites
  if (req.method === "PUT") {
    const { id, data } = req.body;
    console.log(req.body);
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const result = await db.collection("favorites").updateOne(
        { userId: id },
        {
          $set: {
            userId: id,
            favProducts: data,
          },
        },
        { upsert: true }
      );
      if (result && (result.matchedCount || result.upsertedId)) {
        console.log("updateObject", result);
        res.status(201).json({
          message: "favorite-products-updated",
        });
      } else res.status(411).json({ message: "favorite-products-not-found" });
    } catch {
      res.status(411).json({ message: "find-favorites-failed" });
      client.close();
    }
    client.close();
  }
}

export default favorite;

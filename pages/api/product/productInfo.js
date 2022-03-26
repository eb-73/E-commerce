import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";
async function productInfo(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    let client;
    client = await connectToDatabase();
    try {
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
      return;
    }
    try {
      const db = client.db();
      const collection = db.collection("products");
      const result = await collection.findOne({ _id: ObjectId(id) });
      if (result) res.status(200).json({ productInfo: result });
      else res.status(422).json({ message: "product-not-found" });
    } catch {
      res.status(422).json({ message: "find-product-failed" });
      client.close();
    }

    client.close();
  }
}
export default productInfo;

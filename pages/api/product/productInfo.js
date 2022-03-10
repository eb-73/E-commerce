import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";
async function productInfo(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("products");
    const result = await collection.findOne({ _id: ObjectId(id) });
    res.status(200).json({ productInfo: result });
    client.close();
  }
}
export default productInfo;
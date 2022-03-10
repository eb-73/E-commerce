import { MongoClient, ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
async function getOrder(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    console.log(userId);
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(422).json({ message: "connect_to_database_failed" });
      return;
    }

    const db = client.db();
    const result = await db
      .collection("orders")
      .findOne({ costumerId: userId, orderStatus: "pending" });
    if (result) {
      res.status(200).json({ order: result });
    } else if (!result) {
      const orderId = ObjectId();
      console.log("objectid", orderId.toString());
      res.status(422).json({ message: "order_not_found", orderId: orderId });
    }

    client.close();
  }
}
export default getOrder;

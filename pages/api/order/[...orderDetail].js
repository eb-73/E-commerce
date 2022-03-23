import { MongoClient, ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
async function getOrder(req, res) {
  if (req.method === "GET") {
    const { orderDetail } = req.query;
    const [id, status] = orderDetail;
    let client;
    let result;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(422).json({ message: "connect_to_database_failed" });
      return;
    }

    const db = client.db();
    if (status === "pending") {
      result = await db
        .collection("orders")
        .findOne({ costumerId: id, orderStatus: "pending" });
    } else if (status === "paid") {
      result = await db.collection("orders").findOne(
        { _id: ObjectId(id), orderStatus: "paid" },
        {
          projection: {
            payment: 1,
            delivery: 1,
            orderProducts: 1,
            orderTotalPrice: 1,
          },
        }
      );
    } else if (status === "all") {
      result = await db
        .collection("orders")
        .find({ costumerId: id, orderTotalPrice: { $gt: 0 } })
        .toArray();
    }

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

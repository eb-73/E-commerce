import { ObjectId } from "mongodb";
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
      res.status(500).json({ message: "connect-to-database-failed" });
      return;
    }
    try {
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
        res.status(200).json({ message: "order-not-found", orderId: orderId });
      }
    } catch {
      res.status(422).json({ message: "order-found-failed" });
      client.close();
    }

    client.close();
  }
}
export default getOrder;

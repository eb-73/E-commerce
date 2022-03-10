import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
async function order(req, res) {
  if (req.method === "POST") {
    const orderData = req.body;
    let client;
    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    const db = client.db();
    if (orderData.orderId) {
      const result = await db.collection("orders").updateOne(
        { _id: ObjectId(orderData.orderId) },
        {
          $set: {
            _id: ObjectId(orderData.orderId),
            costumerId: orderData.costumerId,
            orderDate: orderData.orderDate,
            orderStatus: orderData.orderStatus,
            orderTotalPrice: orderData.orderTotalPrice,
            orderProducts: orderData.orderProducts,
          },
        },
        { upsert: true }
      );

      res.status(202).json({ message: "order_updated" });
    }

    client.close();
  }
  if (req.method === "PUT") {
    const deliveryData = req.body;
    let client;
    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      const order = await db.collection("orders").updateOne(
        { costumerId: deliveryData.costumerId, orderStatus: "pending" },
        {
          $set: {
            delivery: {
              name: deliveryData.name,
              lastName: deliveryData.lastName,
              address: deliveryData.address,
              city: deliveryData.city,
              email: deliveryData.email,
              province: deliveryData.province,
              phone: deliveryData.phone,
              postalCode: deliveryData.postalCode,
            },
          },
        }
      );
      if (order.modifiedCount)
        res.status(201).json({ message: "order-information-updated" });
      else res.status(411).json({ message: "order-not-found" });
    } catch {
      res.status(411).json({ message: "insert-data-failed" });
      client.close();
    }
    client.close();
  }
}
export default order;

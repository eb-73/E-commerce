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
    const { dataFor } = req.query;
    const data = req.body;
    let client;
    let order;
    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(500).json({ message: "connect-to-database-failed" });
    }
    try {
      const db = client.db();
      if (dataFor && dataFor === "delivery") {
        order = await db.collection("orders").updateOne(
          { costumerId: data.costumerId, orderStatus: "pending" },
          {
            $set: {
              delivery: {
                name: data.name,
                lastName: data.lastName,
                address: data.address,
                city: data.city,
                email: data.email,
                province: data.province,
                phone: data.phone,
                postalCode: data.postalCode,
              },
            },
          }
        );
        if (order && order.matchedCount)
          res.status(201).json({
            message: "order-information-updated",
          });
        else res.status(411).json({ message: "order-not-found" });
      } else if (dataFor && dataFor === "payment") {
        order = await db.collection("orders").findOneAndUpdate(
          {
            costumerId: data.costumerId,
            orderStatus: "pending",
            orderTotalPrice: { $gt: 0 },
          },
          {
            $set: {
              orderStatus: "paid",
              payment: {
                isPaid: data.isPaid,
                paidAt: data.paidAt,
                email: data.email,
                paymentMethod: data.paymentMethod,
              },
            },
          }
        );
        if (order && order.lastErrorObject.updatedExisting)
          res.status(201).json({
            message: "order-information-updated",
            id: order.value._id.toString(),
          });
        else res.status(411).json({ message: "order-not-found" });
      }

      // console.log("order", order.lastErrorObject.updatedExisting);
      // console.log("order id", order.value._id.toString());
    } catch {
      res.status(411).json({ message: "insert-data-failed" });
      client.close();
    }
    client.close();
  }
}
export default order;

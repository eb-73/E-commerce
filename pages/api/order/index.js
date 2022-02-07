import { MongoClient, ObjectId } from "mongodb";

async function order(req, res) {
  if (req.method === "POST") {
    const orderData = req.body;
    const url =
      "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true";
    const client = await MongoClient.connect(url);
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
}
export default order;

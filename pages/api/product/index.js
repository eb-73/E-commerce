import { connectToDatabase } from "../../../lib/db";
async function order(req, res) {
  if (req.method === "GET") {
    const { page, category, limit } = req.query;
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("products");
    const result = await collection
      .find(
        {
          category:
            category === "All" || category === "undefined"
              ? { $exists: true }
              : { $regex: category, $options: "i" },
        },
        { skip: (+page - 1) * +limit, limit: +limit }
      )
      .toArray();
    res.status(200).json(result);
    client.close();
  }
}
export default order;

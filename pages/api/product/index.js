import { connectToDatabase } from "../../../lib/db";
async function order(req, res) {
  if (req.method === "GET") {
    const { page, category, limit } = req.query;
    let client;
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
      return;
    }
    try {
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
      if (result) res.status(200).json(result);
      else res.status(422).json({ message: "product-not-found" });
    } catch {
      res.status(422).json({ message: "find-product-failed" });
      client.close();
    }

    client.close();
  }
}
export default order;

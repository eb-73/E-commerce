import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
async function searching(req, res) {
  if (req.method === "GET") {
    console.log("req Query", req.query);
    const { q, category, filter, size, color, price } = req.query;
    const client = await connectToDatabase();
    const db = client.db();
    const data = await db
      .collection("products")
      .find({
        $and: [
          { product_title: { $regex: q ? q : "", $options: "i" } },
          {
            category: {
              $regex: filter === "All" ? "" : filter,
              $options: "i",
            },
          },
          { product_price: { $regex: price ? price : "", $options: "i" } },
        ],
      })
      .toArray();
    // .find(q&&{product_title: { $regex: q, $options: "i"}},category&&{sub_category:category.map(item=>item.value)},size&&{size:size.map(item=>item.value)} ,color&&{color:color.mp(item=>item.value)}  )
    console.log(data);
    if (data) res.status(200).json({ productsFilter: data });
    client.close();
  }
}
export default searching;

import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
async function searching(req, res) {
  if (req.method === "GET") {
    let { q, filter, category, size, color, price } = req.query;
    const catArray = category.split(",");
    const sizeArray = size.split(",");
    const colorArray = color.split(",");
    console.log("req Query", catArray.length);
    const client = await connectToDatabase();
    const db = client.db();
    const data = await db
      .collection("products")
      .find({
        $and: [
          {
            product_title:
              q === "undefined"
                ? { $exists: false }
                : { $regex: q, $options: "i" },
          },

          {
            category:
              filter === "All" || filter === "undefined"
                ? { $exists: false }
                : { $regex: filter, $options: "i" },
          },

          {
            sub_category:
              catArray[0] === "undefined"
                ? { $exists: false }
                : { $in: [...catArray] },
          },
          {
            "size.name":
              sizeArray[0] === "undefined"
                ? { $exists: false }
                : { $in: [...sizeArray] },
          },

          // { product_price: { $regex: price ? price : "", $options: "i" } },
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

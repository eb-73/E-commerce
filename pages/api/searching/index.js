import { connectToDatabase } from "../../../lib/db";
async function searching(req, res) {
  if (req.method === "GET") {
    let { q, filter, category, size, color, price } = req.query;
    const catArray = category?.split(",");
    const sizeArray = size?.split(",");
    const colorArray = color?.split(",");
    let client;
    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(500).json({ message: "connect_to_database_failed" });
      return;
    }
    try {
      const db = client.db();
      const data = await db
        .collection("products")
        .find({
          $or: [
            {
              $and: [
                {
                  productTitle:
                    q === "undefined"
                      ? { $exists: false }
                      : { $regex: q, $options: "i" },
                },

                {
                  category:
                    filter === "All" || filter === "undefined"
                      ? { $exists: true }
                      : { $regex: filter, $options: "i" },
                },
              ],
            },

            {
              subCategory:
                !catArray || catArray[0] === "undefined"
                  ? { $exists: false }
                  : { $in: [...catArray] },
            },
            {
              "size.name":
                !sizeArray || sizeArray[0] === "undefined"
                  ? { $exists: false }
                  : { $in: [...sizeArray] },
            },
            {
              color:
                !colorArray || colorArray[0] === "undefined"
                  ? { $exists: false }
                  : { $in: [...colorArray] },
            },
            // { product_price: { $regex: price ? price : "", $options: "i" } },
          ],
        })
        .toArray();
      // .find(q&&{product_title: { $regex: q, $options: "i"}},category&&{sub_category:category.map(item=>item.value)},size&&{size:size.map(item=>item.value)} ,color&&{color:color.mp(item=>item.value)}  )
      if (data) res.status(200).json({ productsFilter: data });
      else res.status(422).json({ message: "products-not-found" });
    } catch (err) {
      res.status(422).json({ message: "find-products-faild" });
      client.close();
    }

    client.close();
  }
}
export default searching;

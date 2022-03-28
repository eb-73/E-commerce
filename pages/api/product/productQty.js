import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
async function productQty(req, res) {
  // for check quantity of products and decrease them
  if (req.method === "PUT") {
    const { forr } = req.query;
    let client;
    let ok = false;
    let status = [];
    let oldQty = [];
    try {
      client = await connectToDatabase();
    } catch {
      res.status(500).json({ message: "connect-to-database-failed" });
      return;
    }
    try {
      const db = client.db();
      const collection = db.collection("products");
      // fetch products id and size if exist
      if (forr === "check") {
        const quantities = req.body;
        const result = await collection
          .find(
            {
              _id: { $in: quantities.map((item) => ObjectId(item.id)) },
            },
            {
              projection: {
                _id: 1,
                size: 1,
              },
            }
          )
          .toArray();

        if (!result || !quantities) {
          res.status(422).json({ message: "products-not-found" });
          client.close();
          return;
        }
        //check if qty value less than size stock
        quantities.forEach((item) => {
          result.forEach((innerItem) => {
            if (innerItem._id.toString() === item.id) {
              const index = innerItem.size.findIndex(
                (el) => el.name === item.size
              );
              status.push(item.qty <= +innerItem.size[index].quantity);
              oldQty.push(innerItem.size[index].quantity);
            }
          });
        });
        ok = status.every((item) => item);
        //
        //if the qty is out of stock
        if (!ok) {
          res
            .status(422)
            .json({ message: "the-requested-products-is-out-of-stock" });
          client.close();
          return;
        } else if (ok) {
          res
            .status(200)
            .json({ message: "the-requested-products-is-stock", oldQty });
          client.close();
          return;
        }
      }
      //
      //if the qty is less than enough
      if (forr === "update") {
        const orderProducts = req.body;
        const updateResults = await Promise.all(
          orderProducts.quantities.map(async (item, index) => {
            const result = await collection.updateOne(
              {
                _id: ObjectId(item.id),
                "size.name": item.size,
              },
              {
                $set: {
                  "size.$.quantity": +orderProducts.oldQty[index] - item.qty,
                },
              }
            );
            return result.modifiedCount;
          })
        );
        const updated = updateResults.every((item) => item);
        if (!updated) {
          res.status(422).json({ message: "update-products-quantity-failed" });
          client.close();
          return;
        }
        res
          .status(201)
          .json({ message: "update-products-quantity-successfully" });
        client.close();
      }
      //
    } catch {
      res.status(500).json({ message: "something-is-wrong" });
      client.close();
    }
    client.close();
  }
}

export default productQty;

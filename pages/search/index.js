import Head from "next/head";
import Search from "../../components/homePage/Search";
import SideWrapper from "../../components/homePage/side/SideWrapper";
import Side from "../../components/homePage/side/Side";
import SortNav from "../../components/homePage/SortNav";
import CardsWraper from "../../components/homePage/CardsWraper";
import { ContextProvider } from "../../context/ctxStore";
import { MongoClient } from "mongodb";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/ui/Loading";
function SearchPage(props) {
  const [products, setProducts] = useState(props.productsArray);
  const router = useRouter();
  // const { q, category, size, color, price } = router.query;
  // console.log(router);
  // useEffect(() => {
  //   async function getSearch() {
  //     const res = await fetch(
  //       `/api/searching?${q ? `q=${q}&` : ""}${
  //         category && Array.isArray(category)
  //           ? `category=${category.join("&category=")}`
  //           : ""
  //       }${category && !Array.isArray(category) ? `category=${category}` : ""}${
  //         size && Array.isArray(size) ? `size=${size.join("&size=")}` : ""
  //       }${size && !Array.isArray(size) ? `size=${size}` : ""}${
  //         color && Array.isArray(color) ? `color=${color.join("&color=")}` : ""
  //       }${color && !Array.isArray(color) ? `color=${color}` : ""}`
  //     );

  //     const data = await res.json();
  //     return data;
  //   }
  //   // if (Object.keys(router.query).length > 0) {
  //   //   getSearch().then((data) => setProducts(data.productsFilter));
  //   // }
  // }, [router.query]);

  //fetch all query
  useEffect(() => {
    console.log("query", router.query);
    fetch(`/api/searching?q=${router.query.q}&filter=${router.query.filter}`)
      .then((res) => res.json())
      .then((data) => console.log("data", data));
  }, [router.query]);
  //
  return (
    <ContextProvider>
      <Head>
        <title>Ebrahim</title>
        <meta name="description" content="Created by Ebrahim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav quantity={products.length}>
        <Side
          name="category"
          items={products.map((product) => product.sub_category)}
        />
        {/* <Side name="size" items={products.map((product) => product.size)} />
        <Side name="color" items={products.map((product) => product.color)} /> */}
      </SortNav>
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <SideWrapper>
          <Side
            name="category"
            items={products
              .map((product) => product.sub_category)
              .filter((item, index, self) => self.indexOf(item) == index)}
          />
          {/* <Side
            name="size"
            items={products.map((product) => product.size[0].name)}
          /> */}
          {/* <Side
              name="color"
              items={products.map((product) => product.color)}
            /> */}
        </SideWrapper>

        <CardsWraper products={products} />
      </div>
    </ContextProvider>
  );
}
export async function getStaticProps() {
  let result;

  const url =
    "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true&w=majorityy";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.find().toArray();
  client.close();

  return {
    props: {
      productsArray: result.map((item) => {
        return {
          id: item._id.toString(),
          product_price: item.product_price,
          product_description: item.product_description,
          category: item.category,
          pic_url: item.pic_url,
          product_title: item.product_title,
          prosuct_sub_title: item.prosuct_sub_title,
          sub_category: item.sub_category,
          color: item.color,
          size: item.size,
        };
      }),
    },
    revalidate: 86400,
  };
}
export default SearchPage;

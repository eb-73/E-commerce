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
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../../redux/actions";
function SearchPage({ filters }) {
  const products = useSelector((state) => state.SearchProducts.products);
  const dispatch = useDispatch();
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
    dispatch(
      getSearchProducts(
        router.query.q,
        router.query.filter,
        router.query.category,
        router.query.size,
        router.query.color
      )
    );
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
        <Side name="category" items={filters.category} />
        <Side name="size" items={filters.size} />
        <Side name="color" items={filters.color} />
      </SortNav>
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <SideWrapper>
          <Side name="category" items={filters.category} />
          <Side name="size" items={filters.size} />
          <Side name="color" items={filters.color} />
        </SideWrapper>

        <CardsWraper products={products} query={router.query.q} />
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
  let colors = [];
  result.forEach((items) => {
    items.color.forEach((item) => {
      colors.push(item);
    });
  });

  let sizes = [];
  result.forEach((items) => {
    items.size.forEach((item) => {
      sizes.push(item.name);
    });
  });

  return {
    props: {
      filters: {
        category: result
          .map((item) => item.sub_category)
          .filter((item, index, self) => self.indexOf(item) == index),
        color: colors.filter(
          (item, index, self) => self.indexOf(item) == index
        ),
        size: sizes.filter((item, index, self) => self.indexOf(item) == index),
      },
    },
    revalidate: 86400,
  };
}
export default SearchPage;

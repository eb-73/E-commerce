import Head from "next/head";
import Search from "../../../components/homePage/Search";
import SortNav from "../../../components/homePage/SortNav";
import Side from "../../../components/homePage/side/Side";
import CardsWraper from "../../../components/homePage/CardsWraper";
import { ContextProvider } from "../../../context/ctxStore";

import { MongoClient } from "mongodb";
import { useState } from "react";
const ShoesPage = (props) => {
  const { shoesArray: shoes } = props;
  return (
    <ContextProvider>
      <Head>
        <title>shoes</title>
        <meta name="description" content="shoes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav page="shoes" />
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <Side page="shoes" />
        <CardsWraper products={shoes} />
      </div>
    </ContextProvider>
  );
};
export async function getStaticProps() {
  let result;

  const url =
    "mongodb+srv://Ebrahim-73:VO1I4YdpiDIb9yua@cluster0.kbxqj.mongodb.net/shop?retryWrites=true&w=majorityy";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.find({ category: "shoes" }).toArray();
  client.close();

  return {
    props: {
      shoesArray: result.map((item) => {
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
export default ShoesPage;

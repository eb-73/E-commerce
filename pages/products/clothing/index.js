import Head from "next/head";
import Search from "../../../components/homePage/Search";
import SortNav from "../../../components/homePage/SortNav";
import SideWrapper from "../../../components/homePage/side/SideWrapper";
import Side from "../../../components/homePage/side/Side";
import CardsWraper from "../../../components/homePage/CardsWraper";
import { ContextProvider } from "../../../context/ctxStore";

import { MongoClient } from "mongodb";
import { useState } from "react";
const ClothePage = (props) => {
  const { clothesArray: clothes } = props;
  return (
    <ContextProvider>
      <Head>
        <title>clothing</title>
        <meta name="description" content="clothes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav page="clothing" />
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <SideWrapper>
          <Side name="category" items={["T-Shirts", "Suits", "Coats"]} />
          <Side name="Size" items={["XS", "S", "M", "L", "XL", "XL"]} />
        </SideWrapper>
        <CardsWraper products={clothes} />
      </div>
    </ContextProvider>
  );
};
export async function getStaticProps() {
  let result;

  const url =
    "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true&w=majorityy";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.find({ category: "clothing" }).toArray();
  client.close();

  return {
    props: {
      clothesArray: result.map((item) => {
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
export default ClothePage;

import Head from "next/head";
import Search from "../../components/homePage/search/Search";
import SideWrapper from "../../components/homePage/side/SideWrapper";
import Side from "../../components/homePage/side/Side";
import SortNav from "../../components/homePage/SortNav";
import CardsWraper from "../../components/homePage/CardsWraper";
import { ViewContextProvider } from "../../context/ctxStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../../redux/actions";
import { connectToDatabase } from "../../lib/db";
function SearchPage({ filters }) {
  const products = useSelector((state) => state.SearchProducts.products);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("search products", products);
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
    <ViewContextProvider>
      <Head>
        <title>Products. E.B SHOP</title>
        <meta
          name="description"
          content="Find Products at E.B SHOP. Free delivery and returns."
        />
        <link rel="icon" href="/logo.png" />
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
    </ViewContextProvider>
  );
}

export async function getStaticProps() {
  let result;
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.find().toArray();
  client.close();
  const category = result.map((item) => item.subCategory);
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
        category: category.filter(
          (item, index, self) => self.indexOf(item) == index
        ),
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

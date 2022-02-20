import Head from "next/head";
import Search from "../../../components/homePage/search/Search";
import SortNav from "../../../components/homePage/SortNav";
import SideWrapper from "../../../components/homePage/side/SideWrapper";
import Side from "../../../components/homePage/side/Side";
import CardsWraper from "../../../components/homePage/CardsWraper";
import { ContextProvider } from "../../../context/ctxStore";
import { connectToDatabase } from "../../../lib/db";
const ClothePage = (props) => {
  const { clothesArray: clothes, filters } = props;
  return (
    <ContextProvider>
      <Head>
        <title>clothing</title>
        <meta name="description" content="clothes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav quantity={clothes.length}>
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
        <CardsWraper products={clothes} />
      </div>
    </ContextProvider>
  );
};
export async function getStaticProps() {
  let result;
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.find({ category: "clothing" }).toArray();
  client.close();
  //filter data
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
export default ClothePage;

import Head from "next/head";
import Search from "../components/homePage/Search";
import SideWrapper from "../components/homePage/side/SideWrapper";
import Side from "../components/homePage/side/Side";
import SortNav from "../components/homePage/SortNav";
import CardsWraper from "../components/homePage/CardsWraper";
import { ContextProvider } from "../context/ctxStore";
import { MongoClient } from "mongodb";
function Home(props) {
  const { productsArray: products } = props;
  return (
    <ContextProvider>
      <Head>
        <title>Ebrahim</title>
        <meta name="description" content="Created by Ebrahim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav page="home" />
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <SideWrapper>
          <Side name="category" items={["T-Shirts", "Suits", "Coats"]} />
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
export default Home;

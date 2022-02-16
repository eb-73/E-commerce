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
export default Home;

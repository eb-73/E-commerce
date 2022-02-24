import Head from "next/head";
import Search from "../../../components/homePage/search/Search";
import SortNav from "../../../components/homePage/SortNav";
import SideWrapper from "../../../components/homePage/side/SideWrapper";
import Side from "../../../components/homePage/side/Side";
import CardsWraper from "../../../components/homePage/CardsWraper";
import { ContextProvider } from "../../../context/ctxStore";
import { connectToDatabase } from "../../../lib/db";
import LoaadingButton from "../../../components/ui/LoadingButton";
import usePagination from "../../../hooks/usePagination";
import { useRouter } from "next/router";
let showLoadMore = true;
const ShoesPage = (props) => {
  const { shoesArray, filters } = props;
  const router = useRouter();
  const {
    products: shoes,
    size,
    setSize,
    isLoadingMore,
  } = usePagination(shoesArray, "shoes");
  if (shoes && shoes.length === 10) {
    showLoadMore = false;
  }
  const setSizeHandler = () => {
    setSize(size + 1);
    router.push(
      { pathname: router.pathname, query: { page: size + 1, limit: "8" } },
      null,
      { shallow: true }
    );
  };
  return (
    <ContextProvider>
      <Head>
        <title>shoes</title>
        <meta name="description" content="shoes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav quantity={shoes.length}>
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
        <CardsWraper products={shoes} />
      </div>
      {showLoadMore ? (
        <LoaadingButton
          loadMore={isLoadingMore}
          setSizeHandler={setSizeHandler}
        />
      ) : (
        <h5 className="my-4 text-center">No more products</h5>
      )}
    </ContextProvider>
  );
};
export async function getStaticProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("products");
  const result = await collection
    .find({ category: "shoes" }, { limit: 8 })
    .toArray();
  const filterResult = await collection
    .find({ category: "shoes" }, { color: 1, size: 1, sub_category: 1 })
    .toArray();
  client.close();
  //filter data
  let category = filterResult.map((item) => item.sub_category);
  let colors = [];
  filterResult.forEach((items) => {
    items.color.forEach((item) => {
      colors.push(item);
    });
  });

  let sizes = [];
  filterResult.forEach((items) => {
    items.size.forEach((item) => {
      sizes.push(item.name);
    });
  });
  return {
    props: {
      shoesArray: result.map((item) => {
        return {
          _id: item._id.toString(),
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
export default ShoesPage;

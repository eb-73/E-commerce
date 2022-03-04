import style from "./index.module.css";
import ProductInfo from "../../../components/productPage/ProductInfo";
import ImageSlider from "../../../components/productPage/ImageSlider";
import ProductOption from "../../../components/productPage/ProductOption";
import DemoCart from "../../../components/shopPage/DemoCart";
import { ObjectId } from "mongodb";
import { CSSTransition } from "react-transition-group";
import { connectToDatabase } from "../../../lib/db";
import { useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Product = (props) => {
  const [showCart, setShowCart] = useState(false);
  // const [product, setProduct] = useState(props.product);
  const { data, error } = useSWR(
    `/api/product/productInfo?id=${props.productInfo._id}`,
    fetcher,
    { fallbackData: props }
  );
  let product;
  if (data && data.productInfo) {
    console.log("data", data);
    product = {
      id: data.productInfo._id.toString(),
      product_price: data.productInfo.product_price,
      product_description: data.productInfo.product_description,
      category: data.productInfo.category,
      pic_url: data.productInfo.pic_url,
      product_title: data.productInfo.product_title,
      prosuct_sub_title: data.productInfo.prosuct_sub_title,
      sub_category: data.productInfo.sub_category,
      color: data.productInfo.color,
      size: data.productInfo.size,
    };
  }
  const openCartHandler = () => {
    setShowCart(true);
  };
  const closeCartHandler = () => {
    setShowCart(false);
  };
  return (
    <div className={` d-flex flex-column flex-sm-row ${style.productPage}`}>
      <ProductInfo
        title={product.product_title}
        subTitle={product.prosuct_sub_title}
        price={product.product_price}
        description={product.product_description}
        className="d-none d-sm-flex"
      />
      <ImageSlider imagesUrl={product.pic_url} />
      <ProductInfo
        title={product.product_title}
        subTitle={product.prosuct_sub_title}
        price={product.product_price}
        description={product.product_description}
        className="d-flex d-sm-none"
      />
      <ProductOption
        colors={product.color}
        sizes={product.size}
        productId={product.id}
        productTitle={product.product_title}
        subCategory={product.sub_category}
        productPrice={product.product_price}
        imageUrl={product.pic_url[0]}
        openShopingCart={openCartHandler}
      />
      <CSSTransition
        in={showCart}
        timeout={500}
        unmountOnExit
        mountOnEnter
        classNames={{
          enter: style.showModal,
          enterActive: style.showModalActive,
          exit: style.hideModal,
          exitActive: style.hideModalActive,
        }}
      >
        <DemoCart closeShopingCart={closeCartHandler} />
      </CSSTransition>
    </div>
  );
};
export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("products");
  const result = await collection.find({}, { _id: true }).limit(5).toArray();
  console.log("result", result);
  client.close();
  return {
    paths: result.map((item) => ({
      params: { productId: item._id.toString() },
    })),
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  const id = context.params.productId;
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("products");
  const result = await collection.findOne({ _id: ObjectId(id) });
  client.close();
  return {
    props: {
      productInfo: {
        _id: result._id.toString(),
        product_price: result.product_price,
        product_description: result.product_description,
        category: result.category,
        pic_url: result.pic_url,
        product_title: result.product_title,
        prosuct_sub_title: result.prosuct_sub_title,
        sub_category: result.sub_category,
        color: result.color,
        size: result.size,
      },
    },
    revalidate: 86400,
  };
}
export default Product;

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
import Head from "next/head";
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
    product = {
      id: data.productInfo._id.toString(),
      productPrice: data.productInfo.productPrice,
      productDescription: data.productInfo.productDescription,
      category: data.productInfo.category,
      picUrl: data.productInfo.picUrl,
      productTitle: data.productInfo.productTitle,
      productSubTitle: data.productInfo.productSubTitle,
      subCategory: data.productInfo.subCategory,
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
    <>
      <Head>
        <title>{`${product.productTitle} ${product.productSubTitle}. E.B SHOP`}</title>
        <meta
          name="description"
          content={`Find the ${product.productTitle} ${product.productSubTitle} at E.B SHOP.  Free delivery and returns.`}
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={` d-flex flex-column flex-sm-row ${style.productPage}`}>
        <ProductInfo
          title={product.productTitle}
          subTitle={product.productSubTitle}
          price={product.productPrice}
          description={product.productDescription}
          className="d-none d-sm-flex"
        />
        <ImageSlider imagesUrl={product.picUrl} />
        <ProductInfo
          title={product.productTitle}
          subTitle={product.productSubTitle}
          price={product.productPrice}
          description={product.productDescription}
          className="d-flex d-sm-none"
        />
        <ProductOption
          colors={product.color}
          sizes={product.size}
          productId={product.id}
          title={product.productTitle}
          subTitle={product.productSubTitle}
          subCategory={product.subCategory}
          price={product.productPrice}
          imageUrl={product.picUrl[0]}
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
    </>
  );
};
export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("products");
  const result = await collection
    .find({}, { projection: { _id: true } })
    .limit(5)
    .toArray();
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
  let result;
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("products");
    result = await collection.findOne({ _id: ObjectId(id) });
  } catch (err) {
    client.close();
    return { notFound: true };
  }

  client.close();
  if (result) {
    return {
      props: {
        productInfo: {
          _id: result._id.toString(),
          productPrice: result.productPrice,
          productDescription: result.productDescription,
          category: result.category,
          picUrl: result.picUrl,
          productTitle: result.productTitle,
          productSubTitle: result.productSubTitle,
          subCategory: result.subCategory,
          color: result.color,
          size: result.size,
        },
      },
      revalidate: 86400,
    };
  } else {
    return { notFound: true };
  }
}
export default Product;

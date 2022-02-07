import style from "./index.module.css";
import ProductInfo from "../../components/productPage/ProductInfo";
import ImageSlider from "../../components/productPage/ImageSlider";
import ProductOption from "../../components/productPage/ProductOption";
import DemoCart from "../../components/shopPage/DemoCart";
import { MongoClient, ObjectId } from "mongodb";
import { CSSTransition } from "react-transition-group";

import { useState } from "react";
const Product = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [product, setProduct] = useState(props.product);
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
  let result;

  const url =
    "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true&w=majorityy";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.find({}, { _id: true }).limit(5).toArray();
  console.log("result", result);
  client.close();
  return {
    paths: result.map((item) => ({
      params: { productId: item._id.toString() },
    })),
    fallback: "blocking", // false or 'blocking'
  };
}
export async function getStaticProps(context) {
  const id = context.params.productId;
  let result;

  const url =
    "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true&w=majorityy";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const collection = db.collection("products");
  result = await collection.findOne({ _id: ObjectId(id) });
  client.close();
  return {
    props: {
      product: {
        id: result._id.toString(),
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

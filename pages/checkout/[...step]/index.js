import Head from "next/head";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import Checkout from "../../../components/checkoutPage/Checkout";
import Delivery from "../../../components/checkoutPage/Delivery";
import OrderComplete from "../../../components/checkoutPage/OrderComplete";
import Payment from "../../../components/checkoutPage/Payment";
import Stepper from "../../../components/checkoutPage/Stepper";
import { ObjectId } from "mongodb";
const CheckoutStep = ({ pageName }) => {
  let content;
  if (pageName === "delivery") {
    content = (
      <Checkout pageName="delivery">
        <Delivery />
      </Checkout>
    );
  }
  if (pageName === "payment") {
    content = (
      <Checkout pageName="payment">
        <Payment />
      </Checkout>
    );
  }
  if (pageName === "order-complete") {
    content = (
      <Checkout pageName="order-complete">
        <OrderComplete />
      </Checkout>
    );
  }
  return (
    <div className="pt-5">
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Stepper />
      {content}
    </div>
  );
};
export async function getServerSideProps(context) {
  const { step } = context.params;
  let isOrder = false;
  if (step && step[1]) {
    const client = await connectToDatabase();
    const db = client.db();
    const order = await db
      .collection("orders")
      .findOne({ orderStatus: "paid", _id: ObjectId(step[1]) });
    if (order) {
      isOrder = true;
    }
  }
  // session check
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: { session: session },
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  } else if (step[0] === "delivery" && session) {
    return {
      props: { pageName: step[0], session: session },
    };
  } else if (step[0] === "payment" && session) {
    return {
      props: { pageName: step[0], session: session },
    };
  } else if (step[0] === "order-complete" && isOrder && session) {
    return {
      props: { pageName: step[0], session: session },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
export default CheckoutStep;

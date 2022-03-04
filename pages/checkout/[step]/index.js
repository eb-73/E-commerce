import { getSession } from "next-auth/react";
import Checkout from "../../../components/checkoutPage/Checkout";
import Delivery from "../../../components/checkoutPage/Delivery";
import OrderComplete from "../../../components/checkoutPage/OrderComplete";
import Payment from "../../../components/checkoutPage/Payment";
import Stepper from "../../../components/checkoutPage/Stepper";
const CheckoutStep = ({ pageName }) => {
  let content;
  if (pageName === "delivery") {
    content = (
      <Checkout>
        <Delivery />
      </Checkout>
    );
  }
  if (pageName === "payment") {
    content = (
      <Checkout>
        <Payment />
      </Checkout>
    );
  }
  if (pageName === "order-complete") {
    content = (
      <Checkout>
        <OrderComplete />
      </Checkout>
    );
  }
  return (
    <div className="pt-5">
      <Stepper />
      {content}
    </div>
  );
};
export async function getServerSideProps(context) {
  const { step } = context.params;
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: { session: session },
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  }

  //else if and session check
  else if (step === "delivery" && session) {
    return {
      props: { pageName: step, session: session },
    };
  } else if (step === "payment" && session) {
    return {
      props: { pageName: step, session: session },
    };
  } else if (step === "order-complete" && session) {
    return {
      props: { pageName: step, session: session },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
export default CheckoutStep;

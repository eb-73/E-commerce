import style from "./OrderComplete.module.css";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import OrderList from "./orderList/OrderList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOrderDetail } from "../../actions/actions";
import toast from "react-hot-toast";
import SkeletonLoading from "../ui/SkeletonLoading";
import TotalPrice from "../shopPage/TotalPrice";
const OrderComplete = () => {
  const [showDrop, setShowDrop] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    id: "",
    paid: "",
    paymentMethod: "",
    address: "",
    products: [],
    total: "",
    isLoad: false,
  });
  const router = useRouter();
  const { step } = router.query;
  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrderDetail(step[1], "paid");
      console.log(result.order);
      const {
        order: { _id: id, delivery, payment, orderProducts, orderTotalPrice },
      } = result;
      setOrderInfo({
        id: id.toString(),
        paid: payment.isPaid,
        paymentMethod: payment.paymentMethod,
        address: `${delivery.province}, ${delivery.city}, ${delivery.address}`,
        products: orderProducts,
        total: orderTotalPrice,
        isLoad: true,
      });
    };
    if (step[1]) {
      fetchOrder()
        .then()
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  }, [step[1]]);
  const toggleList = () => {
    setShowDrop((prevState) => !prevState);
  };
  return (
    <div className={`mt-2  ${style.orderComplete}`}>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${style.success}`}
      >
        <CheckCircleIcon className={style.checkIcon} />
        <h2 className="text-center my-2">THANK YOU!</h2>
      </div>
      <div
        className={`my-3 d-flex flex-column-reverse flex-sm-row align-items-center align-items-sm-start justify-content-sm-between ${style.content}`}
      >
        {orderInfo.isLoad ? (
          <div className={`  ${style.orderInfo}`}>
            <h1 className={`px-3 d-flex align-items-center ${style.header}`}>
              YOUR ORDER WAS PLACED SUCCESSFULLY
            </h1>

            <h1 className={`mx-3 my-0 ${style.orderId}`}>
              YOUR ORDER <span>{orderInfo.id}</span>
            </h1>
            <div className={`mx-3 my-0 ${style.address}`}>
              <h1 className={`mb-4 ${style.title}`}>SHIPPING ADDRESS</h1>
              <h3 className={`my-2 ${style.shipingAddress}`}>
                {orderInfo.address}
              </h3>
              <h3 className={`my-2 ${style.status}`}>Status: not delivered</h3>
            </div>
            <div className={`mx-3 my-0 ${style.payment}`}>
              <h1 className={`mb-4 ${style.title}`}>PAYMENT METHOD</h1>
              <h3 className={`my-2 ${style.method}`}>
                {orderInfo.paymentMethod}
              </h3>
              <h3 className={`my-2 ${style.status}`}>
                Status: {orderInfo.paid ? "paid" : "not paid"}
              </h3>
            </div>
            <div
              className={`m-3 d-flex justify-content-center justify-content-sm-end ${style.orderInfoButton}`}
            >
              <button>Go to shop</button>
            </div>
          </div>
        ) : (
          <div className={`border-0  ${style.orderInfo}`}>
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </div>
        )}
        {orderInfo.isLoad ? (
          <div className={`mb-3 mb-sm-0 ${style.orderCart}`}>
            <h1
              onClick={toggleList}
              className="px-3 m-0 user-select-none d-flex align-items-center justify-content-between justify-content-sm-start"
            >
              IN YOUR BAG
              {showDrop ? (
                <ChevronUpIcon
                  className={`d-sm-none d-block ${style.collapseIcon}`}
                />
              ) : (
                <ChevronDownIcon
                  className={`d-sm-none d-block ${style.collapseIcon}`}
                />
              )}
            </h1>
            <div
              className={`mx-3 d-sm-block ${showDrop ? "d-block" : "d-none"}`}
            >
              <TotalPrice totalPrice={orderInfo.total} />
              <OrderList products={orderInfo.products} />
            </div>
          </div>
        ) : (
          <div
            className={`border-0 mb-3 mb-sm-0 d-sm-block d-none ${style.orderCart}`}
          >
            <SkeletonLoading /> <SkeletonLoading /> <SkeletonLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderComplete;

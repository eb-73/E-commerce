import style from "./DeleteModal.module.css";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import { signOut } from "next-auth/react";
import { orderAction } from "../../../redux/orderSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { favoriteAction } from "../../../redux/favoriteSlice";
const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = props.userId;
  //close modal
  const closeModal = (e) => {
    if (e.target.id === "overlay") {
      props.hide();
    }
  };
  //delete account
  const deleteAccountHandler = async () => {
    if (userId) {
      const res = await fetch(`/api/user?id=${userId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        //logout user
        signOut({ redirect: false });
        localStorage.removeItem("cart");
        dispatch(orderAction.clearOrder());
        dispatch(favoriteAction.clear());
        router.replace("/login");
        //
      } else {
        toast.error(result.message);
      }
    }
  };
  return createPortal(
    <div id="overlay" onClick={closeModal} className={` ${style.overlay}`}>
      <div className={` ${style.modal}`}>
        <div className={`d-flex align-items-center px-2 ${style.header}`}>
          Delete account
        </div>
        <div className={`d-flex align-items-center px-2 ${style.content}`}>
          Are you sure to delete your account?
        </div>
        <div
          className={`d-flex justify-content-end align-items-center p-2 ${style.footer}`}
        >
          <button className="mx-2 btn btn-secondary" onClick={props.hide}>
            Close
          </button>
          <button className="btn btn-danger" onClick={deleteAccountHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("myportal")
  );
};

export default DeleteModal;

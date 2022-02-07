import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
const useLogin = () => {
  const login = async (email, pass) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      pass,
    });

    console.log("result", result);
    if (result.ok && !result.error) {
      router.replace("/");
      // get order list from database
      //   const session = await getSession();
      //   if (session && session.user.email) {
      //     dispatch(getOrderList(session.user.email));
      //   }
      //
    } else {
      throw new Error(result.error);
    }
  };
  return {
    login,
  };
};

export default useLogin;

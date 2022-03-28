import { signIn } from "next-auth/react";
const useLogin = () => {
  const login = async (email, pass) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      pass,
    });
    if (result.ok && !result.error) {
      return result;
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

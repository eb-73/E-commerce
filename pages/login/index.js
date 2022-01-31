import LayoutLogin from "../../components/loginPage/LayoutLogin";
import Login from "../../components/loginPage/Login";
import { getSession } from "next-auth/react";
const LoginPage = () => {
  return (
    <LayoutLogin>
      <Login />
    </LayoutLogin>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      props: { session: session },
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  }
  return { props: { session: session } };
}
export default LoginPage;

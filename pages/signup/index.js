import LayoutLogin from "../../components/loginPage/LayoutLogin";
import Head from "next/head";
import Signup from "../../components/loginPage/Signup";
import { getSession } from "next-auth/react";
const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Signup</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <LayoutLogin>
        <Signup />
      </LayoutLogin>
    </>
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
export default SignupPage;

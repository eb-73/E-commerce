import Favorites from "../../components/favoritePage/Favorites";
import { getSession } from "next-auth/react";
import Head from "next/head";
const FavoritePage = () => {
  return (
    <>
      <Head>
        <title>Favorites</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Favorites />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: { session: session },
      redirect: {
        destination: "/login",
        permament: false,
      },
    };
  }
  return { props: { session: session } };
}
export default FavoritePage;

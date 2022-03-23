import Head from "next/head";
import { getSession } from "next-auth/react";
import AccountDetail from "../../../components/userPage/profile/AccountDetail";
import ChangePass from "../../../components/userPage/profile/ChangePass";
import Nav from "../../../components/userPage/profile/Nav";
import Orders from "../../../components/userPage/order/Orders";
import Profile from "../../../components/userPage/profile/Profile";
import { useState } from "react";
const OptionPage = ({ pageName }) => {
  const [hideSide, setHideSide] = useState({ navSide: false, content: "" });
  //hide & show navSide in mobile view
  const hideNavHandler = (contentName) => {
    setHideSide({ navSide: true, content: contentName });
  };
  const showNavHandler = () => {
    setHideSide({ navSide: false, content: "" });
  };
  //set title for haed and content for page body
  let title;
  let content;
  if (!pageName[1] && pageName[0] === "profile") {
    title = "Profile";
    content = (
      <Profile
        hideSide={hideSide.navSide}
        contentName={hideSide.content}
        hideHandler={hideNavHandler}
      >
        <AccountDetail
          contentName={hideSide.content}
          showHandler={showNavHandler}
        />
      </Profile>
    );
  }
  if (pageName[0] === "profile" && pageName[1] === "change-password") {
    title = "Change password";
    content = (
      <Profile
        hideSide={hideSide.navSide}
        hideHandler={hideNavHandler}
        contentName={hideSide.content}
      >
        <ChangePass
          contentName={hideSide.content}
          showHandler={showNavHandler}
        />
      </Profile>
    );
  }
  if (pageName[0] === "orders") {
    title = "Orders";
    content = <Orders />;
  }
  return (
    <div className="pt-5">
      <Head>
        <title>{`Account ${title}`}</title>
        <meta name="description" content="Created by Ebrahim" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      {content}
    </div>
  );
};
export async function getServerSideProps(context) {
  const { user = [] } = context.params;
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: { session: session },
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  } else if (user[0] === "orders" && session) {
    return {
      props: { pageName: user, session: session },
    };
  } else if (user[0] === "profile" && session) {
    return {
      props: { pageName: user, session: session },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
export default OptionPage;

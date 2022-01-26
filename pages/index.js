import Head from "next/head";
import Search from "../components/homePage/Search";
import Side from "../components/homePage/Side";
import SortNav from "../components/homePage/SortNav";
import CardsWraper from "../components/homePage/CardsWraper";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ebrahim</title>
        <meta name="description" content="Created by Ebrahim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav />
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <Side />
        <CardsWraper />
      </div>
    </>
  );
}

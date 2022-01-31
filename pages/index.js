import Head from "next/head";
import Search from "../components/homePage/Search";
import Side from "../components/homePage/side/Side";
import SortNav from "../components/homePage/SortNav";
import CardsWraper from "../components/homePage/CardsWraper";
import { ContextProvider } from "../context/ctxStore";
export default function Home() {
  return (
    <ContextProvider>
      <Head>
        <title>Ebrahim</title>
        <meta name="description" content="Created by Ebrahim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SortNav page="home" />
      <div className="content mt-2 d-flex align-items-center align-items-sm-start  justify-content-sm-between">
        <Side page="home" />
        <CardsWraper />
      </div>
    </ContextProvider>
  );
}

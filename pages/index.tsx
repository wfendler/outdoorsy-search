import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Search from "../components/Search";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Search | Outdoorsy</title>
        <meta
          name="description"
          content="Safe, easy & fully insured. Schedule your RV rental from a huge local selection."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Search />
      </main>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";

import Search from "../components/Search";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Search | Outdoorsy</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main>
        <div className="mx-auto my-8 max-w-lg">
          <Search />
        </div>
      </main>
    </div>
  );
};

export default Home;

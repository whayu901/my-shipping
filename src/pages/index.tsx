import type { NextPage } from "next";
import Head from "next/head";

import Container from "components/container";
import Header from "components/header";
import Sidebar from "components/sidebar";
import MainContent from "components/content";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Shipper Dashboard</title>
      </Head>

      <Header />

      <Container>
        <Sidebar />
        <MainContent>
          <div style={{ justifyContent: "center", display: "flex" }}>
            Welcome to dashboard Shipper.id
          </div>
        </MainContent>
      </Container>
    </div>
  );
};

export default Home;

import Head from "next/head";
import LandingPage from "../components/LandingPage";
import { useEffect } from "react";

export default function Home({ products, families }) {
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title> Tem Greece Portal </title>
      </Head>
      <main>
        <LandingPage products={products} families={families} />{" "}
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const products_response = await fetch(
    `${process.env.HOST_URL}/api/pricelist/getAllPrices`
  );
  const products = await products_response.json();
  const families_response = await fetch(
    `${process.env.HOST_URL}/api/pricelist/getProductFamilies`
  );
  const families = await families_response.json();

  return {
    props: {
      products,
      families,
    },
  };
};

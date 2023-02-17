import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
import Page from "./page";

const Custom404: React.FC = () => {
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-5 text-white">
          <div className="text-6xl">404</div>
          <div className="text-xl">Sivua ei löytynyt</div>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Custom404;

import Footer from "./footer";
import Header from "./header";
import Page from "./page";
import CustomHead from "./custom-head";

const Custom404: React.FC = () => {
  return (
    <>
      <CustomHead title="Sivua ei löytynyt" />
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

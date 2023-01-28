import { type NextPage } from "next";
import Head from "next/head";
import EventBoard from "../../components/event-board";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Page from "../../components/page";
import { trpc } from "../../utils/trpc";

const Events: NextPage = () => {
  const events = trpc.event.visible.useQuery(undefined, { enabled: false });

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex w-screen max-w-4xl flex-1 flex-col items-center justify-center p-4">
          {events.data && (
            <EventBoard events={events.data} title="Kaikki tapahtumat" />
          )}
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Events;

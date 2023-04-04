import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { type NextPage } from "next";
import EventBoard from "../../components/content/event-board";
import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import Page from "../../components/layout/page";
import { createContext } from "../../server/trpc/context";
import { appRouter } from "../../server/trpc/router/_app";
import { trpc } from "../../utils/trpc";
import superjson from "superjson";
import CustomHead from "../../components/layout/custom-head";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.event.visible.prefetch();
  await ssg.sponsor.all.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Events: NextPage = () => {
  const events = trpc.event.visible.useQuery(undefined, { enabled: false });

  return (
    <>
      <CustomHead title="Tapahtumat" />
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

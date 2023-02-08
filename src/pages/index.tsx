import { type InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import LinkButton from "../components/link-button";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { trpc } from "../utils/trpc";
import Page from "../components/page";
import EventBoard from "../components/event-board";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  const todayString = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  await ssg.event.future.prefetch({ today: new Date(todayString) });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      todayString,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  todayString,
}) => {
  const events = trpc.event.future.useQuery(
    { today: new Date(todayString) },
    { enabled: false }
  );

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="flex max-w-4xl flex-col items-center justify-center gap-16 p-16 px-8 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Tervetuloa sivuillemme!
            </h1>
            <div className="flex flex-col gap-6 text-lg lg:text-xl">
              <p>
                Ihanaa Elämää ry:n Burleskipoppoon tarkoituksena on ylläpitää
                sekä edistää aikuisten monipuolista harrastus- ja
                vapaa-ajantoimintaa, iloista ja positiivista ajattelua,
                elämänasennetta ja hauskanpitoa. Toimintaa on ympäri Suomen.
              </p>
              <p>
                Jos sinulla on hyvä idea, ota yhteyttä{" "}
                <a
                  href="mailto:burleskia@ihanaaelamaa.fi"
                  className="text-blue-300 hover:underline"
                >
                  burleskia@ihanaaelamaa.fi
                </a>
              </p>
              <p>
                The Hard Days Night -burleski-illat ovat monipuolisia ja
                elämyksellisiä tapahtumia vaihtuvin teemoin.
              </p>
              <p>
                Lavalle nousevat niin uudet tulokkaat kuin pidempään esiintyneet
                artistitkin.
              </p>
              <p>
                Jäsenemme ovat etusijalla esiintyjävalinnoissa! Älä epäröi ottaa
                yhteyttä jos haluat nousta lavalle!
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-20">
              <LinkButton href="/join">Liity jäseneksi!</LinkButton>
              <LinkButton href="/contact">Ota yhteyttä!</LinkButton>
            </div>
            {events.data && events.data.length !== 0 && (
              <EventBoard events={events.data} title="Tulevat tapahtumat" />
            )}
          </div>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Home;

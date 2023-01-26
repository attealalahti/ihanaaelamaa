import { type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import LinkButton from "../components/link-button";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { trpc } from "../utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Page from "../components/page";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  await ssg.event.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Home: NextPage = () => {
  const events = trpc.event.getAll.useQuery();

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
            {events.data && (
              <section className="mt-4 w-full">
                <h2 className="mt-2 w-full rounded-t-xl bg-gray-800 bg-opacity-50 p-3 text-2xl lg:mt-4 lg:text-3xl">
                  Tulevat tapahtumat
                </h2>
                {events.data.map(({ id, text }, index) => (
                  <button
                    key={index}
                    className={`${
                      index === events.data.length - 1
                        ? "rounded-b-xl"
                        : " border-b border-slate-300"
                    } group grid w-full grid-flow-col bg-white px-4 py-3 text-left text-black hover:bg-slate-200`}
                  >
                    <div>
                      <p className="text-sm">1.1.2020 {id}</p>
                      <h3 className="text-lg font-bold group-hover:underline lg:text-xl">
                        {text}
                      </h3>
                      <p>
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{" "}
                        Lorem{" "}
                      </p>
                    </div>
                    <div className="flex h-full">
                      <span className="mt-auto p-1 pl-4 opacity-75 transition-all duration-300 group-hover:scale-[1.3] group-hover:opacity-100">
                        <FontAwesomeIcon icon={faArrowRight} size="2x" />
                      </span>
                    </div>
                  </button>
                ))}
              </section>
            )}
          </div>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Home;

/*
const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
*/

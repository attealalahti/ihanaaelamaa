import { type NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-cyan-800">
        <div className="container flex max-w-4xl flex-col items-center justify-center gap-12 p-16 px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Tervetuloa sivuillemme!
          </h1>
          <div className="flex flex-col gap-6 text-xl text-white">
            <p>
              Ihanaa Elämää ry:n Burleskipoppoon tarkoituksena on ylläpitää sekä
              edistää aikuisten monipuolista harrastus- ja vapaa-ajantoimintaa,
              iloista ja positiivista ajattelua, elämänasennetta ja
              hauskanpitoa. Toimintaa on ympäri Suomen.
            </p>
            <p>
              Jos sinulla on hyvä idea, ota yhteyttä{" "}
              <a
                href="mailto:burleskia@ihanaaelamaa.fi"
                className="text-blue-500 hover:underline"
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
        </div>
      </main>
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

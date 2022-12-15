import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-rose-900 to-violet-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Ihanaa Elämää ry
          </h1>
          <div className="text-4xl font-bold text-white">
            🚧 Uusi sivusto on rakenteilla! 🚧
          </div>
          <div className="text-2xl text-white">
            Tämä sivusto on vielä keskeneräinen. Löydät tiedot uusista
            tapahtumista ja uutisista sosiaalisessa mediassa:
          </div>
          <div className="mt-6 flex flex-row flex-wrap justify-center gap-16 align-middle">
            <Link href="https://www.facebook.com/ihanaaelamaa/">
              <span className="rounded-xl border-4 border-blue-300 p-4 text-3xl font-bold text-blue-300 ring-blue-300 hover:underline">
                Facebook
              </span>
            </Link>
            <Link href="https://www.instagram.com/ihanaaelamaayhdistys/">
              <span className="rounded-xl border-4 border-red-200 p-4 text-3xl font-bold text-red-200 ring-red-200 hover:underline">
                Instagram
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

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

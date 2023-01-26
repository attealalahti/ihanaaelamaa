import { type NextPage } from "next";
import Head from "next/head";
import Page from "../../components/page";
import { signIn, signOut, useSession } from "next-auth/react";
import Unauthorized from "../../components/unauthorized";

const AdminHome: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry - Admin</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <main className="flex flex-1 flex-col items-center justify-center">
          {!session ? (
            <button
              className="rounded-xl bg-white p-3 text-xl"
              onClick={() => signIn()}
            >
              Kirjaudu sisään
            </button>
          ) : !session.user?.isAdmin ? (
            <Unauthorized session={session} />
          ) : (
            <>
              <div className="p-2 text-xl text-white">
                Kirjauduttu sisään nimellä {session.user?.name}
              </div>
              <button
                className="rounded-xl bg-white p-3 text-xl"
                onClick={() => signOut()}
              >
                Kirjaudu ulos
              </button>
            </>
          )}
        </main>
      </Page>
    </>
  );
};

export default AdminHome;

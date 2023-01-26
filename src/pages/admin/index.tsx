import { type NextPage } from "next";
import Head from "next/head";
import Page from "../../components/page";
import { useSession } from "next-auth/react";
import Unauthorized from "../../components/unauthorized";
import SignedOut from "../../components/signed-out";
import AdminHeader from "../../components/admin-header";

const AdminHome: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry - Admin</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page admin>
        <AdminHeader session={session} />
        <main className="flex flex-1 flex-col items-center justify-center">
          {!session ? (
            <SignedOut />
          ) : !session.user?.isAdmin ? (
            <Unauthorized session={session} />
          ) : (
            <>
              <div className="text-white">placeholder</div>
            </>
          )}
        </main>
      </Page>
    </>
  );
};

export default AdminHome;

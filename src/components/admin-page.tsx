import Head from "next/head";
import Page from "./page";
import AdminHeader from "./admin-header";
import SignedOut from "./signed-out";
import Unauthorized from "./unauthorized";
import { type Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const AdminPage: React.FC<Props> = ({ children, session }) => {
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry - Admin</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page admin>
        <AdminHeader session={session} />
        <main className="flex w-screen flex-1 flex-col items-center justify-center gap-6 p-6 lg:max-w-6xl">
          {!session ? (
            <SignedOut />
          ) : !session.user?.isAdmin ? (
            <Unauthorized session={session} />
          ) : (
            children
          )}
        </main>
      </Page>
    </>
  );
};

export default AdminPage;

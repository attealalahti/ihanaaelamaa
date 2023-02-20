import Head from "next/head";
import Page from "./../layout/page";
import AdminHeader from "./admin-header";
import SignedOut from "./signed-out";
import Unauthorized from "./unauthorized";
import { type Session } from "next-auth";
import BackButton from "../control/back-button";

type Props = {
  children: React.ReactNode;
  session: Session | null;
  backHref?: string;
};

const AdminPage: React.FC<Props> = ({ children, session, backHref }) => {
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry - Admin</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page admin>
        <AdminHeader session={session} />
        {backHref && session?.user?.isAdmin && <BackButton href={backHref} />}
        <main className="flex w-full flex-1 flex-col items-center gap-6 p-6 pt-0">
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

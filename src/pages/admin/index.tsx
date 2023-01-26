import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AdminPage from "../../components/admin-page";

const AdminHome: NextPage = () => {
  const { data: session } = useSession();

  return (
    <AdminPage session={session}>
      <Link
        href="/admin/events"
        className="rounded-xl bg-white p-4 text-2xl text-black"
      >
        Tapahtumat
      </Link>
    </AdminPage>
  );
};

export default AdminHome;

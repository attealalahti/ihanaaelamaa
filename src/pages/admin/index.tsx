import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AdminPage from "../../components/admin-page";
import { trpc } from "../../utils/trpc";

const AdminHome: NextPage = () => {
  const { data: session } = useSession();

  const build = trpc.auth.build.useMutation();

  return (
    <AdminPage session={session}>
      <Link
        href="/admin/events"
        className="rounded-xl bg-white p-4 text-2xl text-black"
      >
        Tapahtumat
      </Link>
      {/* TODO: Modal that explains what this does, spinner when waiting for a response, error state,
      message after successful mutation about the process taking a few minutes */}
      <button
        className="rounded-xl border border-white bg-gradient-to-br from-rose-800 to-purple-800 p-4 text-2xl text-white"
        onClick={() =>
          build.mutate(undefined, { onSuccess: () => console.log("built") })
        }
      >
        Julkaise muutokset
      </button>
    </AdminPage>
  );
};

export default AdminHome;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import AdminPage from "../../components/admin-page";
import Modal from "../../components/modal";
import { trpc } from "../../utils/trpc";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AdminHome: NextPage = () => {
  const { data: session } = useSession();

  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const build = trpc.auth.build.useMutation();
  const utils = trpc.useContext();

  const publish = () => {
    setPublishModalOpen(false);
    build.mutate(undefined, {
      onSuccess: () => utils.auth.unpublishedChanges.invalidate(),
    });
  };

  return (
    <AdminPage session={session}>
      <Link
        href="/admin/home"
        className="rounded-xl bg-white p-4 text-2xl text-black hover:bg-slate-200"
      >
        Kotisivu
      </Link>
      <Link
        href="/admin/events"
        className="rounded-xl bg-white p-4 text-2xl text-black hover:bg-slate-200"
      >
        Tapahtumat
      </Link>
      <button
        className="rounded-xl border border-white bg-gradient-to-br from-rose-800 to-purple-800 p-4 text-2xl text-white hover:from-rose-900 hover:to-purple-900"
        onClick={() => setPublishModalOpen(true)}
      >
        Julkaise muutokset
        {build.isLoading && (
          <span className="ml-3">
            <FontAwesomeIcon icon={faSpinner} pulse />
          </span>
        )}
      </button>
      {build.isError && (
        <div className="p-4 text-center text-xl font-bold uppercase text-white">
          Julkaisu epäonnistui
        </div>
      )}
      {build.isSuccess && (
        <div className="text-center text-xl font-bold text-white">
          <p>Julkaisu onnistui.</p>
          <p>
            Muutokset näkyvät julkisella sivustolla muutaman minuutin kuluttua.
          </p>
        </div>
      )}
      <Modal open={publishModalOpen}>
        <div className="flex h-full w-full items-center justify-center text-xl">
          <div className="grid max-w-md grid-cols-2 gap-4 rounded-lg bg-white p-6 text-center text-black">
            <div className="col-span-2 mb-4 flex flex-col gap-2">
              <p className="font-bold">Julkaise muutokset?</p>
              <p>
                Julkinen sivusto rakennetaan uudelleen. Tämä kestää muutaman
                minuutin.
              </p>
            </div>
            <button
              className="rounded-lg border border-slate-700 bg-slate-100 p-2 hover:bg-slate-200"
              onClick={() => setPublishModalOpen(false)}
            >
              Ei
            </button>
            <button
              className="rounded-lg border border-slate-700 bg-gradient-to-br from-rose-800 to-purple-800 p-2 text-white hover:from-rose-900 hover:to-purple-900"
              onClick={publish}
            >
              Kyllä
            </button>
          </div>
        </div>
      </Modal>
    </AdminPage>
  );
};

export default AdminHome;

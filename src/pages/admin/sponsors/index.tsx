import {
  faPlus,
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AdminPage from "../../../components/admin/admin-page";
import Modal from "../../../components/control/modal";
import { trpc } from "../../../utils/trpc";

const Sponsors: NextPage = () => {
  const { data: session } = useSession();

  const sponsors = trpc.sponsor.all.useQuery();
  const utils = trpc.useContext();

  const deleteById = trpc.sponsor.delete.useMutation({
    onMutate: ({ id }) => {
      // Optimistically remove deleted sponsor
      utils.sponsor.all.setData((oldSponsors) => {
        if (!oldSponsors) return oldSponsors;
        return oldSponsors.filter((sponsor) => sponsor.id !== id);
      });
    },
  });

  const [sponsorToDelete, setSponsorToDelete] = useState<{
    id: number;
    link: string;
  } | null>(null);

  const deleteSponsor = (id: number | undefined) => {
    setSponsorToDelete(null);
    if (!id) return;
    deleteById.mutate(
      { id },
      { onSuccess: () => utils.auth.unpublishedChanges.invalidate() }
    );
  };

  return (
    <AdminPage session={session} backHref="/admin">
      <div className="flex max-w-4xl flex-col items-center justify-center text-white">
        <Link
          href="/admin/sponsors/new"
          className="m-4 rounded-xl bg-white p-4 text-xl font-bold text-black hover:bg-slate-200 sm:grid-flow-col"
        >
          Lisää uusi sponsori
          <span className="ml-2">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </span>
        </Link>
        <div className="w-screen max-w-4xl p-4">
          {sponsors.data ? (
            sponsors.data.map(({ id, image, link }, index) => (
              <div
                key={index}
                className={`grid grid-flow-col grid-cols-1 gap-1 bg-white text-lg text-black hover:bg-slate-200 ${
                  index === 0 ? "rounded-t-lg" : "border-t border-slate-400"
                } ${index === sponsors.data.length - 1 ? "rounded-b-lg" : ""}`}
              >
                <Link
                  href={`/admin/sponsors/${id}`}
                  className="grid grid-flow-col grid-cols-1 gap-3 p-2"
                >
                  <div className="my-auto overflow-clip">{link}</div>
                  <Image src={image.url} width={40} height={40} alt="" />
                </Link>
                <div className="grid grid-flow-col">
                  <button
                    className="group relative mr-2 p-2 opacity-75 transition-all hover:scale-110 hover:opacity-100"
                    onClick={() => setSponsorToDelete({ id, link })}
                  >
                    <span className="absolute left-full hidden rounded border border-slate-300 bg-white p-1 text-center text-base lg:group-hover:inline">
                      Poista
                    </span>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} pulse size="2x" />
            </div>
          )}
        </div>
      </div>
      <Modal open={sponsorToDelete !== null}>
        <div className="flex h-full w-full items-center justify-center text-xl">
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-6 text-center text-black">
            <div className="col-span-2 mb-4">
              Haluatko varmasti poistaa sponsorin{" "}
              <b className="font-bold">{sponsorToDelete?.link}</b>?
            </div>
            <button
              className="rounded-lg border border-slate-700 bg-slate-100 p-2 hover:bg-slate-200"
              onClick={() => setSponsorToDelete(null)}
            >
              Peruuta
            </button>
            <button
              className="rounded-lg border border-slate-700 bg-red-600 p-2 text-white hover:bg-red-700"
              onClick={() => deleteSponsor(sponsorToDelete?.id)}
            >
              Poista
            </button>
          </div>
        </div>
      </Modal>
    </AdminPage>
  );
};

export default Sponsors;

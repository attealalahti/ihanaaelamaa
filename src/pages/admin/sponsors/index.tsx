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
import AdminPage from "../../../components/admin/admin-page";
import { trpc } from "../../../utils/trpc";

const Sponsors: NextPage = () => {
  const { data: session } = useSession();

  const sponsors = trpc.sponsor.all.useQuery();

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
                  <button className="group relative mr-2 p-2 opacity-75 transition-all hover:scale-110 hover:opacity-100">
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
    </AdminPage>
  );
};

export default Sponsors;

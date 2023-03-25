import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import AdminPage from "../../../components/admin/admin-page";
import facebookLogo from "../../../../public/images/facebook_logo.svg";

const Sponsors: NextPage = () => {
  const { data: session } = useSession();

  const selectImageById = () => {
    return;
  };

  const data = [1, 2, 3];

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
          {data.map((sponsor, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-1 bg-white text-lg text-black hover:bg-slate-200 ${
                index === 0 ? "rounded-t-lg" : "border-t border-slate-400"
              } ${index === data.length - 1 ? "rounded-b-lg" : ""}`}
            >
              <Link
                href={`/admin/sponsors/${sponsor}`}
                className="grid grid-flow-row grid-cols-2 gap-3 p-2"
              >
                <div className="">{sponsor}</div>
                <Image src={facebookLogo} width={40} height={40} alt="" />
              </Link>
              <div className="grid grid-flow-col">
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPage>
  );
};

export default Sponsors;

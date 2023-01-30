import { type Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../utils/trpc";

const HAMBURGER_PATH =
  "M4,4 L27,4 C28,4 28,7 27,7 L4,7 C3,7 3,4 4,4 M4,14 L27,14 C28,14 28,17 27,17 L4,17 C3,17 3,14 4,14 M27,27 L4,27 C3,27 3,24 4,24 L27,24 C28,24 28,27 27,27";
const CROSS_PATH =
  "M5,3 L28,26 C29,27 27,29 26,28 L3,5 C2,4 4,2 5,3 M5,3 L28,26 C29,27 27,29 26,28 L3,5 C2,4 4,2 5,3 M28,5 L5,28 C4,29 2,27 3,26 L26,3 C27,2 29,4 28,5";

type Props = {
  session: Session | null;
};

const AdminHeader: React.FC<Props> = ({ session }) => {
  const [navOpen, setNavOpen] = useState(false);

  const unpublishedChanges = trpc.auth.unpublishedChanges.useQuery();

  if (!session) return null;

  return (
    <header className="flex w-full flex-col bg-gray-800 bg-opacity-50 text-white md:h-20 md:flex-row md:bg-transparent">
      <div className="flex flex-col justify-start md:flex-1 md:flex-row md:items-center">
        <span className="flex w-full md:ml-4 md:w-auto lg:ml-12">
          <Link
            href="/admin"
            className="ml-2 rounded-3xl border border-transparent p-4 text-2xl transition-colors duration-300 hover:border-white md:ml-0"
          >
            Ihanaa Elämää ry
          </Link>
          <div className="flex-1 md:hidden" />
          <button
            aria-label="Toggle Menu"
            className="px-3 md:hidden"
            onClick={() => setNavOpen((value) => !value)}
          >
            <svg viewBox="0 0 32 32" className="h-11 w-11">
              <path
                className="transition-all"
                fill="white"
                d={navOpen ? CROSS_PATH : HAMBURGER_PATH}
              />
            </svg>
          </button>
        </span>
      </div>
      <nav className={`${!navOpen ? "hidden md:block" : ""} md:mr-4 lg:mr-12`}>
        <ul className="h-full w-full text-lg md:flex md:flex-row md:gap-6">
          {unpublishedChanges.data !== undefined && unpublishedChanges.data && (
            <li className="group relative flex md:items-center md:justify-center">
              <span className="absolute top-full hidden rounded border border-slate-300 bg-white p-1 text-center text-black group-hover:inline">
                Muista julkaista muutokset, kun olet valmis
              </span>
              <Link
                href="/admin"
                className="w-screen rounded-3xl bg-white p-4 pl-6 text-black hover:bg-slate-200 md:w-auto md:pl-4"
              >
                Julkaisemattomia muutoksia
                <span className="ml-2">
                  <FontAwesomeIcon icon={faWarning} />
                </span>
              </Link>
            </li>
          )}
          <li className="flex md:items-center md:justify-center">
            <span className="w-screen p-2 md:w-auto">{session.user?.name}</span>
          </li>
          <li className="flex md:items-center md:justify-center">
            <button
              className="w-screen rounded-xl bg-white p-2 text-black hover:bg-slate-200 md:w-auto"
              onClick={() => signOut()}
            >
              Kirjaudu ulos
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;

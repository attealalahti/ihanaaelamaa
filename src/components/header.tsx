import Link from "next/link";
import { useState } from "react";
import NavButton from "./nav-button";

const HAMBURGER_PATH =
  "M4,4 L27,4 C28,4 28,7 27,7 L4,7 C3,7 3,4 4,4 M4,14 L27,14 C28,14 28,17 27,17 L4,17 C3,17 3,14 4,14 M27,27 L4,27 C3,27 3,24 4,24 L27,24 C28,24 28,27 27,27";
const CROSS_PATH =
  "M5,3 L28,26 C29,27 27,29 26,28 L3,5 C2,4 4,2 5,3 M5,3 L28,26 C29,27 27,29 26,28 L3,5 C2,4 4,2 5,3 M28,5 L5,28 C4,29 2,27 3,26 L26,3 C27,2 29,4 28,5";

const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="flex w-full flex-col bg-[#34136680] text-white md:h-20 md:flex-row md:bg-transparent">
      <div className="flex flex-col justify-start md:flex-1 md:flex-row md:items-center">
        <span className="flex w-full md:ml-4 md:w-auto lg:ml-12">
          <Link
            href="/"
            className="ml-2 rounded-3xl border border-transparent p-4 text-2xl transition-colors duration-300 hover:border-white md:ml-0"
          >
            Ihanaa Elämää ry
          </Link>
          <div className="flex-1 md:hidden" />
          <button
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
        <ul className="h-full w-full md:flex md:flex-row md:gap-2">
          <NavButton href="/">Koti</NavButton>
          <NavButton href="/join">Liity</NavButton>
          <NavButton href="/events">Tapahtumat</NavButton>
          <NavButton href="/contact">Yhteystiedot</NavButton>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

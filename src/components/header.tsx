import Link from "next/link";
import NavButton from "./nav-button";

const Header: React.FC = () => {
  return (
    <header className="flex h-20 w-screen text-white">
      <div className="flex flex-1 items-center justify-start">
        <span className="ml-12">
          <Link href="/">
            <span className="rounded-3xl border border-[#FFFFFF00] p-4 text-2xl transition-colors duration-300 hover:border-white">
              Ihanaa Elämää ry
            </span>
          </Link>
        </span>
      </div>
      <nav className="mr-12">
        <ul className="flex h-full w-full gap-2">
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

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex h-20 w-screen text-white">
      <div className="flex flex-1 items-center justify-start">
        <Link href="/">
          <span className="ml-12 rounded-3xl border border-[#FFFFFF00] p-4 text-2xl transition-colors duration-300 hover:border-white">
            Ihanaa Elämää ry
          </span>
        </Link>
      </div>
      <ul className="mr-12 flex gap-2 text-xl">
        <li className="flex items-center justify-center ">
          <Link href="/">
            <span className="rounded-3xl border border-[#FFFFFF00] p-4 transition-colors duration-300 hover:border-white">
              Koti
            </span>
          </Link>
        </li>
        <li className="flex items-center justify-center">
          <Link href="/join">
            <span className="rounded-3xl border border-[#FFFFFF00] p-4 transition-colors duration-300 hover:border-white">
              Liity
            </span>
          </Link>
        </li>
        <li className="flex items-center justify-center">
          <Link href="/events">
            <span className="rounded-3xl border border-[#FFFFFF00] p-4 transition-colors duration-300 hover:border-white">
              Tapahtumat
            </span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

const NavButton: React.FC<Props> = ({ href, children }) => {
  return (
    <li className="flex md:items-center md:justify-center">
      <Link
        href={href}
        className="w-screen rounded-3xl border border-transparent p-4 text-xl transition-colors duration-300 hover:border-white md:w-auto"
      >
        {children}
      </Link>
    </li>
  );
};

export default NavButton;

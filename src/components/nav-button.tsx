import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

const NavButton: React.FC<Props> = ({ href, children }) => {
  return (
    <li className="flex items-center justify-center">
      <Link href={href}>
        <span className="rounded-3xl border border-[#FFFFFF00] p-4 text-xl transition-colors duration-300 hover:border-white">
          {children}
        </span>
      </Link>
    </li>
  );
};

export default NavButton;

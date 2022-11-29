import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

const LinkButton: React.FC<Props> = ({ href, children }) => {
  return (
    <span className="transition-transform duration-300 hover:scale-110">
      <Link href={href}>
        <span className="rounded-3xl border border-white bg-violet-900 bg-opacity-50 p-6 text-xl lg:text-2xl">
          {children}
        </span>
      </Link>
    </span>
  );
};

export default LinkButton;

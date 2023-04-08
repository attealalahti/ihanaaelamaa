import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  href: string;
  text?: string;
};

const BackButton: React.FC<Props> = ({ href, text = "Takaisin" }) => {
  return (
    <Link
      className="my-4 ml-6 self-start rounded-3xl border border-transparent p-4 text-lg text-white transition-colors duration-300 hover:border-white lg:ml-12 lg:text-xl"
      href={href}
    >
      <span className="mr-2">
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
      {text}
    </Link>
  );
};

export default BackButton;

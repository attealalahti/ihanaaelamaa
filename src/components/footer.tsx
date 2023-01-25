import Image from "next/image";
import facebookIcon from "../../public/images/facebook_icon.svg";
import instagramIcon from "../../public/images/instagram_icon.svg";

const Footer: React.FC = () => {
  return (
    <footer className="flex w-full text-white">
      <span className="flex-1" />
      <a
        href="mailto:burleskia@ihanaaelamaa.fi"
        target="_blank"
        rel="noreferrer"
        className="mr-2 mt-1 flex justify-center p-2 align-middle hover:underline"
      >
        burleskia@ihanaaelamaa.fi
      </a>
      <a
        href="https://www.facebook.com/ihanaaelamaa/"
        target="_blank"
        rel="noreferrer"
        className="mr-2 mb-2 p-2"
      >
        <Image width={30} height={30} src={facebookIcon} alt="Facebook" />
      </a>
      <a
        href="https://www.instagram.com/ihanaaelamaayhdistys/"
        target="_blank"
        rel="noreferrer"
        className="mr-4 mb-2 p-2"
      >
        <Image width={30} height={30} src={instagramIcon} alt="Instagram" />
      </a>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import facebookIcon from "../../../public/images/facebook_icon.svg";
import instagramIcon from "../../../public/images/instagram_icon.svg";
import { trpc } from "../../utils/trpc";

const Footer: React.FC = () => {
  const sponsors = trpc.sponsor.all.useQuery(undefined, { enabled: false });

  return (
    <footer className="mb-2 mt-10 flex w-full flex-wrap justify-end text-white">
      {sponsors.data && sponsors.data.length > 0 && (
        <div className="flex flex-grow flex-wrap px-5 lg:px-10">
          <div className="my-auto pr-4">Yhteistyössä:</div>
          {sponsors.data.map(({ link, image }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="relative my-auto mb-0 h-16 w-52"
            >
              <Image fill src={image.url} alt="" className="object-contain" />
            </a>
          ))}
        </div>
      )}
      <div className="flex">
        <a
          href="mailto:burleskia@ihanaaelamaa.fi"
          target="_blank"
          rel="noreferrer"
          className="my-auto mr-2 flex justify-center p-2 align-middle hover:underline"
        >
          burleskia@ihanaaelamaa.fi
        </a>
        <a
          href="https://www.facebook.com/ihanaaelamaa/"
          target="_blank"
          rel="noreferrer"
          className="mb-2 mr-2 mt-auto p-2"
        >
          <Image width={30} height={30} src={facebookIcon} alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com/ihanaaelamaary/"
          target="_blank"
          rel="noreferrer"
          className="mb-2 mr-2 mt-auto p-2"
        >
          <Image width={30} height={30} src={instagramIcon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

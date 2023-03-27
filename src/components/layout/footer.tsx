import Image from "next/image";
import facebookIcon from "../../../public/images/facebook_icon.svg";
import instagramIcon from "../../../public/images/instagram_icon.svg";
import { trpc } from "../../utils/trpc";

const Footer: React.FC = () => {
  const sponsors = trpc.sponsor.all.useQuery(undefined, { enabled: false });

  return (
    <footer className="mb-2 mt-10 flex w-full flex-wrap justify-end text-white">
      {sponsors.data && sponsors.data.length > 0 && (
        <div className="flex flex-grow gap-10 px-10">
          <div className="my-auto">Yhteistyössä:</div>
          {sponsors.data.map(({ link, image }, index) => (
            <a key={index} href={link} target="_blank" rel="noreferrer">
              <Image
                width={60}
                height={60}
                src={image.url}
                alt=""
                className="my-auto mb-0"
              />
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
          className="mr-2 mb-2 mt-auto p-2"
        >
          <Image width={30} height={30} src={facebookIcon} alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com/ihanaaelamaayhdistys/"
          target="_blank"
          rel="noreferrer"
          className="mr-2 mb-2 mt-auto p-2"
        >
          <Image width={30} height={30} src={instagramIcon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

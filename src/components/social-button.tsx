import Image, { type StaticImageData } from "next/image";

type Props = {
  href: string;
  text: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  className: string;
};

const SocialButton: React.FC<Props> = ({
  href,
  text,
  imageSrc,
  imageAlt,
  className,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center justify-center gap-4 rounded-3xl border border-white p-4 text-lg hover:bg-opacity-50 hover:underline lg:text-xl ${className}`}
    >
      <Image width={40} height={40} src={imageSrc} alt={imageAlt} />
      <span className="flex-1 text-center">{text}</span>
    </a>
  );
};

export default SocialButton;

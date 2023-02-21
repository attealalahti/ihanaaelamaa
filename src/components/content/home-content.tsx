import { type PostProps } from "./post";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

const HomeContent: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap items-center justify-center p-16 px-8 text-white">
      <div className="flex max-w-4xl flex-col items-center justify-center gap-16 text-center ">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {data.title}
        </h1>
        <div className="post home text-lg lg:text-xl">
          {ReactHtmlParser(data.content)}
        </div>
      </div>
      {data.imageUrl === undefined ? (
        <div className="m-10 h-[500px] w-[500px] bg-gray-300" />
      ) : data.imageUrl !== null ? (
        <Image
          src={data.imageUrl}
          alt=""
          width={500}
          height={500}
          className="m-10 mb-0"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomeContent;

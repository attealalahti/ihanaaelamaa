import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

export type PostProps = {
  data: {
    title: string;
    content: string;
    imageUrl: string | null | undefined;
    date?: Date;
  };
};

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="flex w-full flex-1 flex-row flex-wrap items-center justify-center">
      <div className="m-10 mt-0 flex max-w-4xl flex-col gap-10 text-white md:gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {data.title}
        </h1>
        <div className="post text-lg lg:text-xl">
          {data.date && (
            <p className="pb-3">{data.date.toLocaleDateString("fi-FI")}</p>
          )}
          {ReactHtmlParser(data.content)}
        </div>
      </div>
      {data.imageUrl === undefined ? (
        <div className="m-10 h-64 w-64 bg-gray-300 shadow-md shadow-black" />
      ) : data.imageUrl !== null ? (
        <Image
          src={data.imageUrl}
          alt=""
          width={500}
          height={500}
          className="m-10 bg-gray-300 shadow-md shadow-black"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;

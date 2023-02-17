import { type PostProps } from "./post";
import ReactHtmlParser from "react-html-parser";

const HomeContent: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="flex max-w-4xl flex-col items-center justify-center gap-16 p-16 px-8 text-center text-white">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {data.title}
      </h1>
      <div className="post home text-lg lg:text-xl">
        {ReactHtmlParser(data.content)}
      </div>
    </div>
  );
};

export default HomeContent;

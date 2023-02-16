import ReactHtmlParser from "react-html-parser";

export type PostProps = {
  data: {
    title: string;
    content: string;
    date?: Date;
  };
};

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="flex flex-1 flex-wrap items-center justify-center">
      <div className="m-10 flex max-w-4xl flex-col gap-10 text-white md:gap-16 lg:min-w-full">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {data.title}
        </h1>
        <div className="post text-lg lg:text-xl">
          {ReactHtmlParser(data.content)}
        </div>
      </div>
      <></>
    </div>
  );
};

export default Post;

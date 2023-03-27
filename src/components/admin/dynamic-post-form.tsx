import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import type { PostFormProps } from "./post-form";

const PostForm = dynamic(() => import("./post-form"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full flex-1 items-center justify-center">
      <FontAwesomeIcon icon={faSpinner} pulse size="2x" color="white" />
    </div>
  ),
});

const DynamicPostForm: React.FC<PostFormProps> = (props) => {
  return <PostForm {...props} />;
};

export default DynamicPostForm;

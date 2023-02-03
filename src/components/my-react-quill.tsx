import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type { ReactQuillProps } from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <FontAwesomeIcon icon={faSpinner} pulse size="2x" color="white" />
    </div>
  ),
});

type NullableProps = Pick<ReactQuillProps, "value"> &
  Pick<ReactQuillProps, "onChange">;

type Props = {
  [K in keyof NullableProps]-?: NonNullable<NullableProps[K]>;
};

const MyReactQuill: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [false, 2] }],
            ["bold", "italic", "underline", "strike"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
        className="bg-white"
      />
    </div>
  );
};

export default MyReactQuill;

import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toBase64 } from "../../utils/text";

const ImageSelector: React.FC = () => {
  const [file, setFiles] = useState<File | undefined>(undefined);

  const uploadImage = useMutation(async () => {
    if (!file) throw new Error("No file selected.");

    const base64 = await toBase64(file);

    const res = await axios.post("api/upload-image", { image: base64 });
    console.log(res.data);
  });

  return (
    <form
      className="flex flex-col text-xl text-white"
      onSubmit={async (e) => {
        e.preventDefault();
        uploadImage.mutate();
      }}
    >
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        required={true}
        onChange={(e) => {
          if (e.target.files) setFiles(e.target.files[0]);
        }}
      />
      <button
        type="submit"
        className="mt-2 rounded border border-white p-1"
        disabled={!file}
      >
        Submit
      </button>
    </form>
  );
};

export default ImageSelector;

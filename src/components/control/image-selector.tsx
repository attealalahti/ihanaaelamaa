import { useState } from "react";
import { trpc } from "../../utils/trpc";
import axios from "axios";
import { CLOUDINARY_TRANFORMATION } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";

const ImageSelector: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const signature = trpc.image.signature.useQuery();

  const uploadImages = useMutation(async () => {
    if (!files) throw new Error("No file selected.");
    if (!signature.data) throw new Error("No signature.");

    const { full, small, cloudName, apiKey } = signature.data;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const requests = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", full.timestamp);
      formData.append("signature", full.signature);

      requests.push(axios.post(url, formData));

      formData.append("timestamp", small.timestamp);
      formData.append("signature", small.signature);
      formData.append("transformation", CLOUDINARY_TRANFORMATION);

      requests.push(axios.post(url, formData));
    }

    const responses = await Promise.all(requests);
    for (const res of responses) {
      console.log(res.data);
    }
  });

  return (
    <form
      className="flex flex-col text-xl text-white"
      onSubmit={async (e) => {
        e.preventDefault();
        uploadImages.mutate();
      }}
    >
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        required={true}
        multiple={true}
        onChange={(e) => setFiles(e.target.files)}
      />
      <button
        type="submit"
        className="mt-2 rounded border border-white p-1"
        disabled={!files || !signature.data}
      >
        Submit
      </button>
    </form>
  );
};

export default ImageSelector;

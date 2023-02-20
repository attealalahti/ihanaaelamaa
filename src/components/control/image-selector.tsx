import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toBase64 } from "../../utils/text";
import Modal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { env } from "../../env/client.mjs";

type Props = {
  selectedImageId: string | null;
  setSelectedImageId: (id: string | null) => void;
};

const ImageSelector: React.FC<Props> = ({
  selectedImageId,
  setSelectedImageId,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const allImages = trpc.image.all.useQuery();
  const utils = trpc.useContext();

  const uploadImage = useMutation(
    async () => {
      if (!file) throw new Error("No file selected.");

      const base64 = await toBase64(file);
      setFile(undefined);

      const res = await axios.post(`${env.NEXT_PUBLIC_URL}/api/upload-image`, {
        image: base64,
      });
      console.log(res.data);
    },
    { onSuccess: () => utils.image.all.invalidate() }
  );

  const selectedImageUrl = allImages.data?.find(
    (image) => image.id === selectedImageId
  )?.url;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {selectedImageId === null ? (
          <div className="flex h-32 w-32 items-center justify-center bg-gray-300 text-lg font-bold">
            <div>Ei kuvaa</div>
          </div>
        ) : selectedImageUrl ? (
          <Image
            className="h-32 w-32 object-cover"
            src={selectedImageUrl}
            alt=""
            width={128}
            height={128}
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} color="white" pulse size="2x" />
          </div>
        )}
        <button
          className="rounded-lg bg-white p-2 hover:bg-slate-200"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Vaihda kuva
        </button>
      </div>
      <Modal open={modalOpen}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full max-w-4xl rounded-lg bg-white p-4">
            <div className="flex max-h-80 flex-wrap gap-2 overflow-y-scroll">
              {allImages.data ? (
                <>
                  <button
                    className={`rounded border-4 bg-gray-300 ${
                      !selectedImageId
                        ? "border-blue-800"
                        : "border-white hover:border-gray-500"
                    }`}
                    disabled={!selectedImageId}
                    onClick={() => setSelectedImageId(null)}
                  >
                    <div className="flex h-32 w-32 items-center justify-center text-lg font-bold">
                      <div>Ei kuvaa</div>
                    </div>
                  </button>
                  {allImages.data.map((image) => (
                    <button
                      key={image.id}
                      className={`rounded border-4 bg-gray-300 ${
                        selectedImageId === image.id
                          ? "border-blue-800"
                          : "border-white hover:border-gray-500"
                      }`}
                      disabled={selectedImageId === image.id}
                      onClick={() => setSelectedImageId(image.id)}
                    >
                      <Image
                        className="h-32 w-32 object-cover"
                        src={image.url}
                        alt=""
                        width={128}
                        height={128}
                      />
                    </button>
                  ))}
                </>
              ) : (
                <div className="flex h-64 w-full items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} pulse size="2x" />
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2">
              <form
                className="flex flex-wrap items-center justify-center gap-2 rounded border border-black p-2 text-xl"
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
                    if (e.target.files) setFile(e.target.files[0]);
                  }}
                />
                <button
                  type="submit"
                  className={`w-full rounded p-2 text-white ${
                    !file || uploadImage.isLoading
                      ? "bg-gray-400"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                  disabled={!file || uploadImage.isLoading}
                >
                  Lisää kuva
                  {uploadImage.isLoading && (
                    <span className="ml-2">
                      <FontAwesomeIcon icon={faSpinner} pulse color="white" />
                    </span>
                  )}
                </button>
              </form>
              <div className="flex items-end justify-end">
                <button
                  className={`rounded-lg p-3 px-6 text-xl text-white ${
                    uploadImage.isLoading
                      ? "bg-gray-400"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                  onClick={() => {
                    setModalOpen(false);
                    setFile(undefined);
                  }}
                  disabled={uploadImage.isLoading}
                >
                  Valmis
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageSelector;

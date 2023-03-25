import { useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toBase64 } from "../../utils/text";
import Modal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../../utils/trpc";
import Image from "next/image";

type Props = {
  selectedImageId: string | null;
  setSelectedImageId: (id: string | null) => void;
};

const ImageSelector: React.FC<Props> = ({
  selectedImageId,
  setSelectedImageId,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageSelectModalOpen, setImageSelectModalOpen] =
    useState<boolean>(false);
  const [imageIdToDelete, setImageIdToDelete] = useState<string | undefined>(
    undefined
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allImages = trpc.image.all.useQuery();
  const deleteImageMutation = trpc.image.delete.useMutation();
  const utils = trpc.useContext();

  const uploadImage = useMutation(
    async () => {
      if (!file) throw new Error("No file selected.");

      const base64 = await toBase64(file);
      setFile(undefined);

      await axios.post(
        `${process.env.URL ?? "http://localhost:3000"}/api/upload-image`,
        {
          image: base64,
        }
      );
    },
    {
      onSuccess: () => utils.image.all.invalidate(),
      onSettled: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    }
  );

  const deleteImage = (imageId: string) => {
    deleteImageMutation.mutate(
      { imageId },
      {
        onSuccess: () => {
          utils.image.all.setData((previous) =>
            previous?.filter((image) => image.id !== imageId)
          );
          if (selectedImageId === imageId) {
            setSelectedImageId(null);
          }
          setImageIdToDelete(undefined);
        },
      }
    );
  };

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
          onClick={() => setImageSelectModalOpen(true)}
        >
          Vaihda kuva
        </button>
      </div>
      <Modal open={imageSelectModalOpen}>
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
                    <div className="group relative" key={image.id}>
                      <button
                        className="absolute top-0 right-0 h-9 w-9 rounded border border-black bg-white opacity-0 group-hover:opacity-100"
                        onClick={() => setImageIdToDelete(image.id)}
                        aria-label="Poista"
                      >
                        <FontAwesomeIcon icon={faTrashCan} size="lg" />
                      </button>
                      <button
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
                    </div>
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
                  e.stopPropagation();
                  uploadImage.mutate();
                }}
              >
                <input
                  className="cursor-pointer"
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  required={true}
                  onChange={(e) => {
                    if (e.target.files) setFile(e.target.files[0]);
                  }}
                />
                {uploadImage.isError && (
                  <div className="font-bold text-red-600">Tapahtui virhe</div>
                )}
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
                    setImageSelectModalOpen(false);
                    setFile(undefined);
                    uploadImage.reset();
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
      <Modal open={imageIdToDelete !== undefined} layer={2}>
        <div className="flex h-full w-full items-center justify-center text-xl">
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-6 text-center text-black">
            <div className="col-span-2 mb-4">
              Haluatko varmasti poistaa tämän kuvan?
            </div>
            {deleteImageMutation.isError && (
              <div className="col-span-2 mb-4 font-bold text-red-600">
                Tapahtui virhe
              </div>
            )}
            <button
              className={`rounded-lg border border-slate-700 bg-slate-100 p-2 ${
                deleteImageMutation.isLoading ? "" : "hover:bg-slate-200"
              }`}
              onClick={() => setImageIdToDelete(undefined)}
              disabled={deleteImageMutation.isLoading}
            >
              Peruuta
            </button>
            <button
              className={`rounded-lg border border-slate-700 p-2 text-white ${
                deleteImageMutation.isLoading
                  ? "bg-gray-500"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => {
                if (imageIdToDelete) deleteImage(imageIdToDelete);
              }}
              disabled={deleteImageMutation.isLoading}
            >
              Poista
              {deleteImageMutation.isLoading && (
                <span className="ml-2">
                  <FontAwesomeIcon icon={faSpinner} color="white" pulse />
                </span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageSelector;

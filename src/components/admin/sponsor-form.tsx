import { type FormEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../../utils/trpc";
import { toBase64 } from "../../utils/text";
import { UPLOAD_SIZE_LIMIT } from "../../utils/constants";

const SponsorForm: React.FC = () => {
  const [link, setLink] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useContext();
  const create = trpc.sponsor.create.useMutation();

  const fileTooLarge = file && file.size > UPLOAD_SIZE_LIMIT;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || fileTooLarge) return;
    const base64 = await toBase64(file);
    create.mutate(
      { image: base64, link },
      {
        onSuccess: () => {
          utils.sponsor.all.invalidate();
          utils.auth.unpublishedChanges.invalidate();
        },
      }
    );
    setLink("");
    setFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      className="flex w-full max-w-3xl flex-col gap-4 p-4 text-black"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center">
        <div className="flex w-full flex-col text-xl">
          <label htmlFor="link" className="text-white">
            Linkki:
          </label>
          <input
            id="link"
            name="link"
            maxLength={200}
            required={true}
            autoComplete="off"
            className="rounded p-1 text-xl"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <input
          type="file"
          required={true}
          ref={fileInputRef}
          accept=".png,.jpg,.jpeg,.webp"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
          className="text-lg text-white"
        />
        <div className="flex-1" />
        <div className="flex items-end">
          <button
            type="submit"
            disabled={fileTooLarge}
            className={`rounded-lg border border-white  p-2 text-lg font-bold ${
              fileTooLarge ? "bg-gray-400" : "bg-green-400 hover:bg-green-500"
            }`}
          >
            {fileTooLarge ? "Tiedosto on liian suuri" : "Lisää sponsori"}
            {create.isLoading && (
              <span className="ml-4">
                <FontAwesomeIcon icon={faSpinner} pulse />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SponsorForm;

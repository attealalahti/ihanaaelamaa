import { useState } from "react";
import { trpc } from "../../utils/trpc";
import ImageSelector from "../control/image-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useUnsavedChangesWarning from "../../hooks/use-unsaved-changes-warning";

const SponsorForm: React.FC = () => {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [link, setLink] = useState<string>("");

  const createSponsor = trpc.sponsor.create.useMutation();

  const saveDisabled =
    selectedImageId === null || link === "" || createSponsor.isLoading;

  const save = () => {
    if (saveDisabled) return;
    createSponsor.mutate({ imageId: selectedImageId, link });
  };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <div className="flex items-center justify-center">
        <div className="flex w-full flex-col text-lg">
          <label htmlFor="link" className="text-white">
            Linkki:
          </label>
          <input
            id="link"
            name="link"
            maxLength={200}
            required={true}
            autoComplete="off"
            className="rounded p-1"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
      <div className="flex">
        <ImageSelector
          selectedImageId={selectedImageId}
          setSelectedImageId={setSelectedImageId}
          isSponsor={true}
        />
        <div className="flex-1" />
        <div className="flex items-end">
          <button
            disabled={saveDisabled}
            onClick={save}
            className={`rounded-lg border border-white p-2 text-lg font-bold ${
              saveDisabled
                ? "bg-gray-300 text-gray-600"
                : "bg-green-400 hover:bg-green-500"
            }`}
          >
            Tallenna
            {createSponsor.isLoading && (
              <span className="ml-4">
                <FontAwesomeIcon icon={faSpinner} pulse />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorForm;

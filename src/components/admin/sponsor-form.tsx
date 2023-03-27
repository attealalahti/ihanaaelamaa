import { useState } from "react";
import ImageSelector from "../control/image-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useUnsavedChangesWarning from "../../hooks/use-unsaved-changes-warning";

export type HandleSponsorSubmit = (
  data: {
    imageId: string;
    link: string;
  },
  setNewDefaults: (data: { imageId: string | null; link: string }) => void
) => void;

type Props = {
  handleSubmit: HandleSponsorSubmit;
  defaultValues?: {
    imageId: string | null;
    link: string;
  };
  isLoading: boolean;
};

const SponsorForm: React.FC<Props> = ({
  handleSubmit,
  defaultValues,
  isLoading,
}) => {
  const [defaultImageId, setDefaultImageId] = useState<string | null>(
    defaultValues?.imageId ?? null
  );
  const [defaultLink, setDefaultLink] = useState<string>(
    defaultValues?.link ?? ""
  );

  const [imageId, setImageId] = useState<string | null>(defaultImageId);
  const [link, setLink] = useState<string>(defaultLink);

  useUnsavedChangesWarning(imageId !== defaultImageId || link !== defaultLink);

  return (
    <form
      className="flex w-full max-w-3xl flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (imageId !== null) {
          handleSubmit({ imageId, link }, ({ imageId, link }) => {
            setDefaultImageId(imageId);
            setDefaultLink(link);
          });
        }
      }}
    >
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
          selectedImageId={imageId}
          setSelectedImageId={setImageId}
          isSponsor={true}
        />
        <div className="flex-1" />
        <div className="flex items-end">
          <button
            type="submit"
            disabled={imageId === null || isLoading}
            className={`rounded-lg border border-white p-2 text-lg font-bold ${
              imageId === null
                ? "bg-gray-300 text-red-600"
                : "bg-green-400 hover:bg-green-500"
            }`}
          >
            {imageId === null ? "Kuvaa ei ole valittu" : "Tallenna"}
            {isLoading && (
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

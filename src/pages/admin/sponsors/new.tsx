import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin/admin-page";
import ImageSelector from "../../../components/control/image-selector";
import { useState } from "react";
import useUnsavedChangesWarning from "../../../hooks/use-unsaved-changes-warning";
import { trpc } from "../../../utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const NewSponsor: NextPage = () => {
  const { data: session } = useSession();

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
    <AdminPage session={session} backHref="/admin/sponsors">
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
                saveDisabled ? "bg-gray-300" : "bg-green-400 hover:bg-green-500"
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
    </AdminPage>
  );
};

export default NewSponsor;

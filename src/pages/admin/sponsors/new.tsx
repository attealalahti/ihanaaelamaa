import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin/admin-page";
import ImageSelector from "../../../components/control/image-selector";
import { useState } from "react";

const NewSponsor: NextPage = () => {
  const { data: session } = useSession();

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  return (
    <AdminPage session={session} backHref="/admin/sponsors">
      <div className="flex gap-4">
        <ImageSelector
          selectedImageId={selectedImageId}
          setSelectedImageId={setSelectedImageId}
        />
        <div className="flex items-center justify-center">
          <div className="flex flex-col text-lg">
            <label htmlFor="link" className="text-white">
              Linkki:
            </label>
            <input
              id="link"
              name="link"
              maxLength={100}
              required={true}
              autoComplete="off"
              className="rounded p-1"
            />
          </div>
        </div>
      </div>
    </AdminPage>
  );
};

export default NewSponsor;

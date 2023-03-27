import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPage from "../../../components/admin/admin-page";
import SponsorForm, {
  type HandleSponsorSubmit,
} from "../../../components/admin/sponsor-form";
import { trpc } from "../../../utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const EditSponsor: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const id = Number(router.query.id);

  const sponsor = trpc.sponsor.byId.useQuery(
    { id },
    { enabled: router.query.id !== undefined }
  );
  const utils = trpc.useContext();
  const update = trpc.sponsor.update.useMutation();

  const handleSubmit: HandleSponsorSubmit = (
    { imageId, link },
    setNewDefaults
  ) => {
    update.mutate(
      { id, imageId, link },
      {
        onSuccess: () => {
          utils.sponsor.byId.invalidate({ id });
          utils.auth.unpublishedChanges.invalidate();
          setNewDefaults({ imageId, link });
        },
      }
    );
  };

  return (
    <AdminPage session={session} backHref="/admin/sponsors">
      {sponsor.data ? (
        <SponsorForm
          handleSubmit={handleSubmit}
          isLoading={update.isLoading}
          defaultValues={{
            imageId: sponsor.data.imageId,
            link: sponsor.data.link,
          }}
        />
      ) : sponsor.error?.shape?.data.code === "NOT_FOUND" ? (
        <div className="text-xl text-white">404 - Sivua ei löytynyt</div>
      ) : sponsor.isError ? (
        <div className="text-xl text-white">Error</div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} size="2x" pulse color="white" />
        </div>
      )}
    </AdminPage>
  );
};

export default EditSponsor;

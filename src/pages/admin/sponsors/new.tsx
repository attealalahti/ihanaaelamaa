import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin/admin-page";
import SponsorForm, {
  type HandleSponsorSubmit,
} from "../../../components/admin/sponsor-form";
import useNavigateAfterRender from "../../../hooks/use-navigate-after-render";
import { trpc } from "../../../utils/trpc";

const NewSponsor: NextPage = () => {
  const { data: session } = useSession();

  const utils = trpc.useContext();
  const create = trpc.sponsor.create.useMutation();

  // Used to get around navigation preventing events not being
  // reset immediately after new defaults are set
  const navigateBack = useNavigateAfterRender("/admin/sponsors");

  const handleSubmit: HandleSponsorSubmit = (
    { imageId, link },
    setNewDefaults
  ) => {
    create.mutate(
      { imageId, link },
      {
        onSuccess: () => {
          utils.sponsor.all.invalidate();
          utils.auth.unpublishedChanges.invalidate();
          setNewDefaults({ imageId, link });
          navigateBack();
        },
      }
    );
  };

  return (
    <AdminPage session={session} backHref="/admin/sponsors">
      <SponsorForm handleSubmit={handleSubmit} isLoading={create.isLoading} />
    </AdminPage>
  );
};

export default NewSponsor;

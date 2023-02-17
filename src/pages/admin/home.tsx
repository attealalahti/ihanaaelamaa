import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../components/admin/admin-page";
import DynamicEventForm from "../../components/admin/dynamic-event-form";
import { type HandleEventSubmit } from "../../components/admin/event-form";
import HomeContent from "../../components/content/home-content";
import { trpc } from "../../utils/trpc";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const EditHome: NextPage = () => {
  const { data: session } = useSession();

  const home = trpc.home.get.useQuery();
  const update = trpc.home.update.useMutation();
  const utils = trpc.useContext();

  const handleSubmit: HandleEventSubmit = (
    { title, content, contentText },
    setNewDefaults
  ) => {
    update.mutate(
      { title, content, contentText },
      {
        onSuccess: () => {
          utils.home.invalidate();
          utils.auth.unpublishedChanges.invalidate();
          setNewDefaults(title, content);
        },
      }
    );
  };

  return (
    <AdminPage session={session} backHref="/admin">
      {home.data ? (
        <DynamicEventForm
          handleSubmit={handleSubmit}
          saveButtonText="Tallenna"
          defaultValues={{
            title: home.data.title,
            content: home.data.content,
          }}
          isLoading={update.isLoading}
          hasDate={false}
          Preview={HomeContent}
        />
      ) : home.isError ? (
        <div className="text-xl text-white">Error</div>
      ) : (
        <FontAwesomeIcon icon={faSpinner} size="2x" pulse color="white" />
      )}
    </AdminPage>
  );
};

export default EditHome;
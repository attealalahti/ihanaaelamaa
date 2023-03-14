import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../components/admin/admin-page";
import DynamicEventForm from "../../components/admin/dynamic-event-form";
import { type HandleEventSubmit } from "../../components/admin/event-form";
import { trpc } from "../../utils/trpc";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Post from "../../components/content/post";

const EditJoin: NextPage = () => {
  const { data: session } = useSession();

  const join = trpc.join.get.useQuery();
  const update = trpc.join.update.useMutation();
  const utils = trpc.useContext();

  const handleSubmit: HandleEventSubmit = (
    { title, content, contentText, imageId },
    setNewDefaults
  ) => {
    update.mutate(
      { title, content, contentText, imageId },
      {
        onSuccess: () => {
          utils.join.invalidate();
          utils.auth.unpublishedChanges.invalidate();
          setNewDefaults({ title, content, imageId: null });
        },
      }
    );
  };

  return (
    <AdminPage session={session} backHref="/admin">
      {join.data ? (
        <DynamicEventForm
          handleSubmit={handleSubmit}
          saveButtonText="Tallenna"
          defaultValues={{
            title: join.data.title,
            content: join.data.content,
            imageId: join.data.imageId,
          }}
          isLoading={update.isLoading}
          hasDate={false}
          Preview={Post}
        />
      ) : join.isError ? (
        <div className="text-xl text-white">Error</div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} size="2x" pulse color="white" />
        </div>
      )}
    </AdminPage>
  );
};

export default EditJoin;

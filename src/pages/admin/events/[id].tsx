import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPage from "../../../components/admin/admin-page";
import { trpc } from "../../../utils/trpc";
import DynamicEventForm from "../../../components/admin/dynamic-event-form";
import { type HandleEventSubmit } from "../../../components/admin/event-form";
import Post from "../../../components/content/post";
import { dateToYYYYmmdd } from "../../../utils/text";

const EditEvent: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const id = Number(router.query.id);

  const event = trpc.event.byId.useQuery(
    { id },
    { enabled: router.query.id !== undefined }
  );
  const update = trpc.event.update.useMutation();
  const utils = trpc.useContext();

  const handleSubmit: HandleEventSubmit = (
    { title, content, contentText, date },
    setNewDefaults
  ) => {
    if (!date) throw new Error("Date not found when submitting.");
    update.mutate(
      { id, title, content, contentText, date: new Date(date) },
      {
        onSuccess: () => {
          utils.event.byId.invalidate({ id });
          utils.auth.unpublishedChanges.invalidate();
          setNewDefaults(title, content, date);
        },
      }
    );
  };

  return (
    <AdminPage session={session}>
      {event.data ? (
        <DynamicEventForm
          handleSubmit={handleSubmit}
          saveButtonText="Tallenna"
          defaultValues={{
            title: event.data.title,
            content: event.data.content,
            date: dateToYYYYmmdd(event.data.date),
          }}
          isLoading={update.isLoading}
          hasDate={true}
          Preview={Post}
        />
      ) : event.error?.shape?.data.code === "NOT_FOUND" ? (
        <div className="text-xl text-white">404 - Sivua ei löytynyt</div>
      ) : event.isError ? (
        <div className="text-xl text-white">Error</div>
      ) : (
        <FontAwesomeIcon icon={faSpinner} size="2x" pulse color="white" />
      )}
    </AdminPage>
  );
};

export default EditEvent;

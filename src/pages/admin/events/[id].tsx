import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPage from "../../../components/admin-page";
import { trpc } from "../../../utils/trpc";
import DynamicEventForm from "../../../components/dynamic-event-form";

const EditEvent: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const id = Number(router.query.id);

  const event = trpc.event.byId.useQuery({ id });
  const update = trpc.event.update.useMutation();
  const utils = trpc.useContext();

  const handleSubmit = (
    title: string,
    content: string,
    contentText: string,
    date: string
  ) => {
    update.mutate(
      { id, title, content, contentText, date: new Date(date) },
      {
        onSuccess: () => {
          utils.event.byId.invalidate({ id });
          utils.auth.unpublishedChanges.invalidate();
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
            date: event.data.date.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          }}
          isLoading={update.isLoading}
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

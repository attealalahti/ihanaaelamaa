import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPage from "../../../components/admin-page";
import { trpc } from "../../../utils/trpc";
import DynamicEventForm from "../../../components/dynamic-event-form";
import { type HandleEventSubmit } from "../../../components/event-form";
import Post from "../../../components/post";

const NewEvent: NextPage = () => {
  const { data: session } = useSession();

  const create = trpc.event.create.useMutation();
  const utils = trpc.useContext();

  const router = useRouter();

  const handleSubmit: HandleEventSubmit = (
    title,
    content,
    contentText,
    date
  ) => {
    create.mutate(
      { title, content, contentText, date: new Date(date) },
      {
        onSuccess: () => {
          utils.event.all.invalidate();
          utils.auth.unpublishedChanges.invalidate();
          router.push("/admin/events");
        },
      }
    );
  };

  return (
    <AdminPage session={session}>
      <DynamicEventForm
        handleSubmit={handleSubmit}
        saveButtonText="Luo tapahtuma"
        isLoading={create.isLoading}
        Preview={Post}
      />
    </AdminPage>
  );
};

export default NewEvent;

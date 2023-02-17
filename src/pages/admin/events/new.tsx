import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPage from "../../../components/admin/admin-page";
import { trpc } from "../../../utils/trpc";
import DynamicEventForm from "../../../components/admin/dynamic-event-form";
import { type HandleEventSubmit } from "../../../components/admin/event-form";
import Post from "../../../components/content/post";

const NewEvent: NextPage = () => {
  const { data: session } = useSession();

  const create = trpc.event.create.useMutation();
  const utils = trpc.useContext();

  const router = useRouter();

  const handleSubmit: HandleEventSubmit = ({
    title,
    content,
    contentText,
    date,
  }) => {
    if (!date) throw new Error("Date not found when submitting.");
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
        hasDate={true}
        Preview={Post}
      />
    </AdminPage>
  );
};

export default NewEvent;

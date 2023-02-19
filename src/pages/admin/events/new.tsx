import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPage from "../../../components/admin/admin-page";
import { trpc } from "../../../utils/trpc";
import DynamicEventForm from "../../../components/admin/dynamic-event-form";
import { type HandleEventSubmit } from "../../../components/admin/event-form";
import Post from "../../../components/content/post";
import { useEffect, useState } from "react";

const NewEvent: NextPage = () => {
  const { data: session } = useSession();

  const create = trpc.event.create.useMutation();
  const utils = trpc.useContext();

  const router = useRouter();

  const [navigateBack, setNavigateBack] = useState<boolean>(false);

  const handleSubmit: HandleEventSubmit = (
    { title, content, contentText, date, imageId },
    setNewDefaults
  ) => {
    if (!date) throw new Error("Date not found when submitting.");
    create.mutate(
      { title, content, contentText, date: new Date(date), imageId },
      {
        onSuccess: () => {
          utils.event.all.invalidate();
          utils.auth.unpublishedChanges.invalidate();
          setNewDefaults({ title, content, date, imageId });
          setNavigateBack(true);
        },
      }
    );
  };

  // Used to get around navigation preventing events not being
  // reset immediately after new defaults are set
  useEffect(() => {
    if (navigateBack) {
      router.push("/admin/events");
      setNavigateBack(false);
    }
  }, [navigateBack, router]);

  return (
    <AdminPage session={session} backHref="/admin/events">
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

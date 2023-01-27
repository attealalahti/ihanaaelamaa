import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import AdminPage from "../../../components/admin-page";
import EventForm from "../../../components/event-form";
import { trpc } from "../../../utils/trpc";

const EditEvent: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const id = Number(router.query.id);

  const event = trpc.event.findOne.useQuery({ id });
  const update = trpc.event.update.useMutation();
  const utils = trpc.useContext();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    content: string,
    date: string
  ) => {
    e.preventDefault();
    update.mutate(
      { id, title, description, content, date: new Date(date) },
      { onSuccess: () => utils.event.findOne.invalidate({ id }) }
    );
  };

  return (
    <AdminPage session={session}>
      {event.data ? (
        <EventForm
          handleSubmit={handleSubmit}
          saveButtonText="Tallenna"
          defaultValues={{
            title: event.data.title,
            description: event.data.description,
            content: event.data.content,
            date: event.data.date.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          }}
          isLoading={update.isLoading}
        />
      ) : event.isError ? (
        <div className="text-white">Error</div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </AdminPage>
  );
};

export default EditEvent;

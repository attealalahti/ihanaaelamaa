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

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    content: string,
    date: string
  ) => {
    e.preventDefault();
    return;
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
            date: "2020-03-04",
          }}
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

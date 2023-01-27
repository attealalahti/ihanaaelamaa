import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import AdminPage from "../../../components/admin-page";
import EventForm from "../../../components/event-form";
import { trpc } from "../../../utils/trpc";

const NewEvent: NextPage = () => {
  const { data: session } = useSession();

  const create = trpc.event.create.useMutation();
  const utils = trpc.useContext();

  const router = useRouter();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    content: string,
    date: string
  ) => {
    e.preventDefault();
    create.mutate(
      { title, description, content, date: new Date(date) },
      {
        onSuccess: () => {
          utils.event.getAllProtected.invalidate();
          router.push("/admin/events");
        },
      }
    );
  };

  return (
    <AdminPage session={session}>
      <EventForm
        handleSubmit={handleSubmit}
        saveButtonText="Luo tapahtuma"
        isLoading={create.isLoading}
      />
    </AdminPage>
  );
};

export default NewEvent;

import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AdminPage from "../../../components/admin-page";
import { trpc } from "../../../utils/trpc";

const NewEvent: NextPage = () => {
  const { data: session } = useSession();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const create = trpc.event.create.useMutation();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create.mutate(
      { title, description, content, date: new Date(date) },
      { onSuccess: () => router.push("/admin/events") }
    );
  };

  return (
    <AdminPage session={session}>
      <form
        className="grid grid-cols-2 gap-4 text-xl lg:w-80"
        onSubmit={handleSubmit}
      >
        <div className="grid">
          <label htmlFor="title" className="text-white">
            Otsikko:
          </label>
          <input
            name="title"
            id="title"
            className="w-full rounded p-1"
            maxLength={100}
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid">
          <label htmlFor="date" className="text-white">
            Päivämäärä:
          </label>
          <input
            name="date"
            id="date"
            className="w-full rounded p-1"
            type="date"
            required={true}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-span-2 grid">
          <label htmlFor="description" className="text-white">
            Lyhyt kuvaus:
          </label>
          <input
            name="description"
            id="description"
            className="w-full rounded p-1"
            maxLength={1_000}
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-span-2 grid">
          <label htmlFor="content" className="text-white">
            Leipäteksti:
          </label>
          <textarea
            name="content"
            id="content"
            className="w-full rounded p-1"
            maxLength={10_000}
            required={true}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div />
        <button
          type="submit"
          className="rounded-xl border border-white bg-green-400 p-2 font-bold"
        >
          Luo tapahtuma
        </button>
      </form>
    </AdminPage>
  );
};

export default NewEvent;

import { useState } from "react";

type Props = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    content: string,
    date: string
  ) => void;
  saveButtonText: string;
  defaultValues?: {
    title: string;
    description: string;
    content: string;
    date: string;
  };
};

const EventForm: React.FC<Props> = ({
  handleSubmit,
  saveButtonText,
  defaultValues,
}) => {
  const [title, setTitle] = useState<string>(defaultValues?.title ?? "");
  const [description, setDescription] = useState<string>(
    defaultValues?.description ?? ""
  );
  const [content, setContent] = useState<string>(defaultValues?.content ?? "");
  const [date, setDate] = useState<string>(defaultValues?.date ?? "");

  return (
    <form
      className="grid grid-cols-2 gap-4 text-xl lg:w-80"
      onSubmit={(e) => handleSubmit(e, title, description, content, date)}
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
        {saveButtonText}
      </button>
    </form>
  );
};

export default EventForm;

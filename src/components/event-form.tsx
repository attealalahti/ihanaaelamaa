import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import MyReactQuill from "./my-react-quill";

type Props = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    content: string,
    date: string
  ) => void;
  saveButtonText: string;
  defaultValues?: {
    title: string;
    content: string;
    date: string;
  };
  isLoading: boolean;
};

const EventForm: React.FC<Props> = ({
  handleSubmit,
  saveButtonText,
  defaultValues,
  isLoading,
}) => {
  const [title, setTitle] = useState<string>(defaultValues?.title ?? "");
  const [content, setContent] = useState<string>(defaultValues?.content ?? "");
  const [date, setDate] = useState<string>(defaultValues?.date ?? "");

  return (
    <form
      className="grid w-full gap-4 text-lg lg:grid-cols-2 lg:text-xl"
      onSubmit={(e) => handleSubmit(e, title, content, date)}
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
          autoComplete="off"
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
          autoComplete="off"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="grid lg:col-span-2">
        <label htmlFor="content" className="text-white">
          Leipäteksti:
        </label>
        <MyReactQuill value={content} onChange={setContent} />
      </div>
      <div />
      <button
        type="submit"
        className="rounded-xl border border-white bg-green-400 p-2 font-bold hover:bg-green-500"
        disabled={isLoading}
      >
        {saveButtonText}
        {isLoading && (
          <span className="ml-4">
            <FontAwesomeIcon icon={faSpinner} pulse />
          </span>
        )}
      </button>
    </form>
  );
};

export default EventForm;

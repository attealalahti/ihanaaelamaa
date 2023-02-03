import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Post from "./post";

export type EventFormProps = {
  handleSubmit: (
    title: string,
    content: string,
    contentText: string,
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

const EventForm: React.FC<EventFormProps> = ({
  handleSubmit,
  saveButtonText,
  defaultValues,
  isLoading,
}) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(defaultValues?.title ?? "");
  const [content, setContent] = useState<string>(defaultValues?.content ?? "");
  const [date, setDate] = useState<string>(defaultValues?.date ?? "");

  const quillRef = useRef<ReactQuill>(null);

  const tooManyCharacters = content.length > 5000;

  return (
    <div>
      <button
        className="relative m-4 rounded-lg border border-white bg-blue-600 p-3 px-6 text-lg font-bold text-white hover:bg-blue-700"
        onClick={() => setShowPreview((value) => !value)}
      >
        {showPreview ? "Näytä muokkausnäkymä" : "Näytä esikatselu"}
      </button>
      {!showPreview ? (
        <form
          className="grid w-full gap-4 text-lg lg:grid-cols-2 lg:text-xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (quillRef.current) {
              handleSubmit(
                title,
                content,
                quillRef.current.getEditor().getText(),
                date
              );
            }
          }}
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
            <div>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ header: [false, 2] }],
                    ["bold", "italic", "underline", "strike"],
                    ["link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
                className="bg-white"
              />
            </div>
          </div>
          <div />
          <button
            type="submit"
            className={`rounded-lg border border-white p-2 font-bold ${
              tooManyCharacters
                ? "bg-gray-300 text-red-600"
                : "bg-green-400 hover:bg-green-500"
            }`}
            disabled={isLoading || tooManyCharacters}
          >
            {tooManyCharacters ? "Liian monta merkkiä!" : saveButtonText}
            {isLoading && (
              <span className="ml-4">
                <FontAwesomeIcon icon={faSpinner} pulse />
              </span>
            )}
          </button>
        </form>
      ) : (
        <Post data={{ title, content, date: new Date(date) }} />
      )}
    </div>
  );
};

export default EventForm;

export const EventFormImportOptions = {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <FontAwesomeIcon icon={faSpinner} pulse size="2x" color="white" />
    </div>
  ),
};

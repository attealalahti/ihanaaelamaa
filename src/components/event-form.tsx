import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { type PostProps } from "./post";
import useUnsavedChangesWarning from "../hooks/use-unsaved-changes-warning";

export type HandleEventSubmit = (
  title: string,
  content: string,
  contentText: string,
  date: string,
  setNewDefaults: (title: string, content: string, date: string) => void
) => void;

export type EventFormProps = {
  handleSubmit: HandleEventSubmit;
  saveButtonText: string;
  defaultValues?: {
    title: string;
    content: string;
    date: string;
  };
  isLoading: boolean;
  Preview: React.FC<PostProps>;
};

const EventForm: React.FC<EventFormProps> = ({
  handleSubmit,
  saveButtonText,
  defaultValues,
  isLoading,
  Preview,
}) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [defaultTitle, setDefaultTitle] = useState<string>(
    defaultValues?.title ?? ""
  );
  const [defaultContent, setDefaultContent] = useState<string>(
    defaultValues?.content ?? ""
  );
  const [defaultDate, setDefaultDate] = useState<string>(
    defaultValues?.date ?? ""
  );

  const [title, setTitle] = useState<string>(defaultTitle);
  const [content, setContent] = useState<string>(defaultContent);
  const [date, setDate] = useState<string>(defaultDate);

  const quillRef = useRef<ReactQuill>(null);

  useUnsavedChangesWarning(
    title !== defaultTitle || content !== defaultContent || date !== defaultDate
  );

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
                date,
                (title, content, date) => {
                  setDefaultTitle(title);
                  setDefaultContent(content);
                  setDefaultDate(date);
                }
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
        <Preview data={{ title, content, date: new Date(date) }} />
      )}
    </div>
  );
};

export default EventForm;

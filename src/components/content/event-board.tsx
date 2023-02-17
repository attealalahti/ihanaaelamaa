import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { type Event } from "@prisma/client";
import { shortenText } from "../../utils/text";

type Props = {
  events: Event[];
  title: string;
};

const EventBoard: React.FC<Props> = ({ events, title }) => {
  return (
    <section className="mt-4 w-full">
      <h2 className="mt-2 w-full rounded-t-xl bg-gray-800 bg-opacity-50 p-3 text-center text-2xl text-white lg:mt-4 lg:text-3xl">
        {title}
      </h2>
      {events.map(({ id, title, contentText, date }, index) => (
        <Link
          key={index}
          href={`/events/${id}`}
          className={`${
            index === events.length - 1
              ? "rounded-b-xl"
              : "border-b border-slate-300"
          } group flex w-full flex-row items-stretch bg-white px-4 py-3 text-left text-black hover:bg-slate-200`}
        >
          <div className="flex-1">
            <p className="text-sm">{date.toLocaleDateString("fi-FI")}</p>
            <h3 className="text-lg font-bold group-hover:underline lg:text-xl">
              {title}
            </h3>
            <p>{shortenText(contentText, 180)}</p>
          </div>
          <div className="flex">
            <span className="mt-auto p-1 pl-4 opacity-75 transition-all duration-300 group-hover:scale-[1.3] group-hover:opacity-100">
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default EventBoard;

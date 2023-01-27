import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin-page";
import { trpc } from "../../../utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AdminEvents: NextPage = () => {
  const { data: session } = useSession();
  const events = trpc.event.all.useQuery();

  return (
    <AdminPage session={session}>
      {events.data ? (
        <section className="flex max-w-4xl flex-col items-center justify-center text-white">
          <Link
            href="/admin/events/new"
            className="m-6 rounded-xl bg-white p-4 text-xl font-bold text-black hover:bg-slate-200"
          >
            Luo uusi tapahtuma
            <span className="ml-2">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </span>
          </Link>
          {events.data.map(({ id, title, description, date }, index) => (
            <Link
              key={index}
              href={`/admin/events/${id}`}
              className={`${
                index === events.data.length - 1
                  ? "rounded-b-xl"
                  : " border-b border-slate-300"
              } ${
                index === 0 ? "rounded-t-xl" : ""
              } group grid w-full grid-flow-col bg-white px-4 py-3 text-left text-black hover:bg-slate-200`}
            >
              <div>
                <p className="text-sm">{date.toLocaleDateString()}</p>
                <h2 className="text-lg font-bold group-hover:underline lg:text-xl">
                  {title}
                </h2>
                <p>{description}</p>
              </div>
              <div className="flex h-full justify-end">
                <span className="mt-auto p-1 pl-4 opacity-75 transition-all duration-300 group-hover:scale-[1.3] group-hover:opacity-100">
                  <FontAwesomeIcon icon={faArrowRight} size="2x" />
                </span>
              </div>
            </Link>
          ))}
        </section>
      ) : events.isError ? (
        <div className="text-white">Error</div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </AdminPage>
  );
};

export default AdminEvents;

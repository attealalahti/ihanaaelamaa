import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin-page";
import { trpc } from "../../../utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AdminEvents: NextPage = () => {
  const { data: session } = useSession();

  const events = trpc.event.all.useQuery();

  const updateVisibility = trpc.event.updateVisibility.useMutation({
    onMutate: ({ id, visible }) => {
      // Optimistically update event visibility
      utils.event.all.setData((oldEvents) => {
        if (!oldEvents) return oldEvents;
        const eventToUpdateIndex = oldEvents.findIndex(
          (event) => event.id === id
        );
        const eventToUpdate = oldEvents[eventToUpdateIndex];
        if (!eventToUpdate) return oldEvents;
        eventToUpdate.visible = visible;
        oldEvents.splice(eventToUpdateIndex, 1, eventToUpdate);
        return oldEvents;
      });
    },
  });
  const utils = trpc.useContext();

  const toggleVisibility = (id: number, visible: boolean) => {
    updateVisibility.mutate({ id, visible });
  };

  return (
    <AdminPage session={session}>
      {events.data ? (
        <section className="flex max-w-4xl flex-col items-center justify-center text-white">
          <Link
            href="/admin/events/new"
            className="m-4 rounded-xl bg-white p-4 text-xl font-bold text-black hover:bg-slate-200"
          >
            Luo uusi tapahtuma
            <span className="ml-2">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </span>
          </Link>
          <div className="w-screen max-w-4xl p-4">
            {events.data.map(
              ({ id, title, description, date, visible }, index) => (
                <div
                  key={id}
                  className={`grid grid-flow-col grid-cols-1 gap-1 bg-white text-lg text-black hover:bg-slate-200 ${
                    index === 0
                      ? "rounded-t-lg"
                      : index === events.data.length - 1
                      ? "rounded-b-lg border-t border-slate-400"
                      : "border-t border-slate-400"
                  }`}
                >
                  <Link
                    href={`/admin/events/${id}`}
                    className="group grid grid-flow-col grid-cols-8 gap-3 p-2"
                  >
                    <div className="col-span-2 font-bold group-hover:underline">
                      {title}
                    </div>
                    <div className="col-span-5">{description}</div>
                    <div className="col-span-1">
                      {date.toLocaleDateString()}
                    </div>
                  </Link>
                  <button
                    className={`group relative p-2 opacity-75 transition-all hover:scale-110 hover:opacity-100 ${
                      visible ? "ml-1" : ""
                    }`}
                    onClick={() => toggleVisibility(id, !visible)}
                  >
                    <span className="absolute right-full hidden rounded border border-slate-300 bg-white p-1 text-center text-base group-hover:inline">
                      Piilota
                    </span>
                    <FontAwesomeIcon
                      icon={visible ? faEye : faEyeSlash}
                      size="lg"
                    />
                  </button>
                  <button className="group relative mr-2 p-2 opacity-75 transition-all hover:scale-110 hover:opacity-100">
                    <span className="absolute left-full hidden rounded border border-slate-300 bg-white p-1 text-center text-base group-hover:inline">
                      Poista
                    </span>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </button>
                </div>
              )
            )}
          </div>
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

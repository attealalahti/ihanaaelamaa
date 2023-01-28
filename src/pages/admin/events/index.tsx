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
import { shortenText } from "../../../utils/text";
import Modal from "../../../components/modal";
import { useState } from "react";

const AdminEvents: NextPage = () => {
  const { data: session } = useSession();

  const [eventToDelete, setEventToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const utils = trpc.useContext();
  const events = trpc.event.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

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
            {events.data.map(({ id, title, content, date, visible }, index) => (
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
                  <div className="col-span-5">{shortenText(content, 60)}</div>
                  <div className="col-span-1">{date.toLocaleDateString()}</div>
                </Link>
                <button
                  className={`group relative p-2 opacity-75 transition-all hover:scale-110 hover:opacity-100 ${
                    visible ? "ml-1" : ""
                  }`}
                  onClick={() => toggleVisibility(id, !visible)}
                >
                  <span className="absolute right-full hidden rounded border border-slate-300 bg-white p-1 text-center text-base group-hover:inline">
                    {visible ? "Piilota" : "Poista piilotus"}
                  </span>
                  <FontAwesomeIcon
                    icon={visible ? faEye : faEyeSlash}
                    size="lg"
                  />
                </button>
                <button
                  className="group relative mr-2 p-2 opacity-75 transition-all hover:scale-110 hover:opacity-100"
                  onClick={() => setEventToDelete({ id, title })}
                >
                  <span className="absolute left-full hidden rounded border border-slate-300 bg-white p-1 text-center text-base group-hover:inline">
                    Poista
                  </span>
                  <FontAwesomeIcon icon={faTrashCan} size="lg" />
                </button>
              </div>
            ))}
          </div>
          <Modal open={eventToDelete !== null}>
            <div className="flex h-full w-full items-center justify-center text-xl">
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-6 text-center text-black">
                <div className="col-span-2 mb-4">
                  Haluatko varmasti poistaa tapahtuman{" "}
                  <b className="font-bold">{eventToDelete?.title}</b>?
                </div>
                <button
                  className="rounded-lg border border-slate-700 bg-slate-100 p-2 hover:bg-slate-200"
                  onClick={() => setEventToDelete(null)}
                >
                  Peruuta
                </button>
                <button className="rounded-lg border border-slate-700 bg-red-600 p-2 text-white hover:bg-red-700">
                  Poista
                </button>
              </div>
            </div>
          </Modal>
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

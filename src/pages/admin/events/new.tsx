import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin-page";

const NewEvent: NextPage = () => {
  const { data: session } = useSession();
  return (
    <AdminPage session={session}>
      <form className="grid grid-cols-2 gap-4 text-xl lg:w-80">
        <div className="grid">
          <label htmlFor="title" className="text-white">
            Otsikko:
          </label>
          <input
            id="title"
            className="w-full rounded p-1"
            maxLength={100}
            required={true}
          />
        </div>
        <div className="grid">
          <label htmlFor="date" className="text-white">
            Päivämäärä:
          </label>
          <input
            id="date"
            className="w-full rounded p-1"
            type="date"
            required={true}
          />
        </div>
        <div className="col-span-2 grid">
          <label htmlFor="description" className="text-white">
            Lyhyt kuvaus:
          </label>
          <input
            id="description"
            className="w-full rounded p-1"
            maxLength={1_000}
            required={true}
          />
        </div>
        <div className="col-span-2 grid">
          <label htmlFor="content" className="text-white">
            Leipäteksti:
          </label>
          <textarea
            id="content"
            className="w-full rounded p-1"
            maxLength={10_000}
            required={true}
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

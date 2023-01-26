import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  session: Session;
};

const Unauthorized: React.FC<Props> = ({ session }) => {
  return (
    <>
      <div className="p-2 text-xl text-white">
        Kirjauduttu sisään nimellä {session.user?.name}
      </div>
      <div className="p-2 text-xl text-white">
        Sinulla ei ole muokkausoikeuksia.
      </div>
      <button
        className="rounded-xl bg-white p-3 text-xl"
        onClick={() => signOut()}
      >
        Kirjaudu ulos
      </button>
    </>
  );
};

export default Unauthorized;

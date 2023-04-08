import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import AdminPage from "../../components/admin/admin-page";
import { trpc } from "../../utils/trpc";

const Privileges: React.FC = () => {
  const { data: session } = useSession();
  const users = trpc.auth.users.useQuery();
  const utils = trpc.useContext();
  const setAdmin = trpc.auth.setAdmin.useMutation({
    onSuccess: () => utils.auth.users.invalidate(),
  });

  return (
    <AdminPage session={session}>
      <div className="flex w-screen max-w-4xl flex-1 flex-col items-center justify-center">
        {users.data && !setAdmin.isLoading ? (
          <div className="p-3">
            <h1 className="mb-3 text-xl font-bold text-white">
              Muut käyttäjät:
            </h1>
            <div className="grid gap-4 rounded bg-white p-3 text-lg">
              <div className="grid grid-cols-6 gap-2 font-bold">
                <div className="col-span-2">Nimi</div>
                <div className="col-span-3">Sähköposti</div>
                <div className="flex items-center justify-end">Voi muokata</div>
              </div>
              {users.data
                .filter(
                  (user) =>
                    session && session.user && user.id !== session.user.id
                )
                .map(({ id, name, email, isAdmin }) => (
                  <div key={id} className="grid grid-cols-6 gap-2">
                    <div className="col-span-2 overflow-clip">{name}</div>
                    <div className="col-span-3 overflow-clip">{email}</div>
                    <div className="flex items-center justify-end">
                      <input
                        className="mr-2 h-6 w-6 cursor-pointer"
                        type="checkbox"
                        checked={isAdmin ?? false}
                        onChange={() =>
                          setAdmin.mutate({ id, isAdmin: !isAdmin })
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : users.isError ? (
          <div className="text-xl text-white">Error</div>
        ) : (
          <FontAwesomeIcon icon={faSpinner} size="2x" color="white" pulse />
        )}
      </div>
    </AdminPage>
  );
};

export default Privileges;

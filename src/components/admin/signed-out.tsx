import { signIn } from "next-auth/react";

const SignedOut: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <button
        className="rounded-xl bg-white p-3 text-xl"
        onClick={() => signIn()}
      >
        Kirjaudu sisään
      </button>
    </div>
  );
};

export default SignedOut;

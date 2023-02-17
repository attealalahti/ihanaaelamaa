import { signIn } from "next-auth/react";

const SignedOut: React.FC = () => {
  return (
    <button
      className="rounded-xl bg-white p-3 text-xl"
      onClick={() => signIn()}
    >
      Kirjaudu sisään
    </button>
  );
};

export default SignedOut;

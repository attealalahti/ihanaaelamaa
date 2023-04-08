type Props = {
  children: React.ReactNode;
  admin?: boolean;
};

const Page: React.FC<Props> = ({ children, admin }) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-r ${
        admin ? "from-purple-900 to-rose-900" : "from-green-900 to-green-700"
      }`}
    >
      {children}
    </div>
  );
};

export default Page;

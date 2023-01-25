type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-900 to-green-700">
      {children}
    </div>
  );
};

export default Page;

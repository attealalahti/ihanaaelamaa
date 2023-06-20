import dynamic from "next/dynamic";

const Dropshop = dynamic(() => import("./dropshop"), {
  ssr: false,
});

const DynamicDropshop: React.FC = () => {
  return <Dropshop />;
};

export default DynamicDropshop;

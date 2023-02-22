import { createPortal } from "react-dom";
import { rosario } from "../../pages/_app";

type Props = {
  children: React.ReactNode;
  open: boolean;
  layer?: 1 | 2;
};

const Modal: React.FC<Props> = ({ children, open, layer = 1 }) => {
  if (!open) return null;

  const portalId = layer === 2 ? "portal2" : "portal1";

  return createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-70" />
      <div
        className={`${rosario.variable} fixed top-2/4 left-2/4 h-screen w-screen -translate-y-1/2 -translate-x-1/2 p-5 py-10 font-sans`}
      >
        {children}
      </div>
    </>,
    document.getElementById(portalId) as HTMLElement
  );
};

export default Modal;

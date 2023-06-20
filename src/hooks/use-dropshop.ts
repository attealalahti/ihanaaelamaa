import { useEffect } from "react";

const useDropshop = () => {
  useEffect(() => {
    const dropshop = document.getElementById("dropshop-loader");
    if (dropshop) {
      dropshop.style.display = "block";
    }
    return () => {
      if (dropshop) {
        dropshop.style.display = "none";
      }
    };
  }, []);
};

export default useDropshop;

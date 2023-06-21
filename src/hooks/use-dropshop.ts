import { useEffect } from "react";

const useDropshop = () => {
  useEffect(() => {
    let dropshop = document.getElementById("dropshop-loader");

    const showDropshop = async () => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

      while (!dropshop) {
        await sleep(100);
        dropshop = document.getElementById("dropshop-loader");
      }
      dropshop.style.display = "block";
    };
    showDropshop();

    return () => {
      if (dropshop) {
        dropshop.style.display = "none";
      }
    };
  }, []);
};

export default useDropshop;

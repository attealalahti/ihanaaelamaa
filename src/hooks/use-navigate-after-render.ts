import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useNavigateAfterRender = (url: string) => {
  const router = useRouter();
  const [aboutToNavigate, setAboutToNavigate] = useState<boolean>(false);

  useEffect(() => {
    if (aboutToNavigate) {
      router.push(url);
      setAboutToNavigate(false);
    }
  }, [aboutToNavigate, router, url]);

  const navigate = () => {
    setAboutToNavigate(true);
  };

  return navigate;
};

export default useNavigateAfterRender;

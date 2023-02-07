import { useRouter } from "next/router";
import { useEffect } from "react";

const message =
  "Haluatko varmasti poistua tältä sivulta? Muutoksia ei tallenneta.";

const useUnsavedChangesWarning = (unsavedChanges: boolean) => {
  const router = useRouter();

  useEffect(() => {
    const routeChangeStartEvent = (url: string) => {
      if (unsavedChanges && url !== router.asPath && !confirm(message)) {
        router.events.emit("routeChangeError");
        router.replace(router.asPath, undefined, { shallow: true });
        throw "Route change aborted. This error can be ignored.";
      }
    };
    router.events.on("routeChangeStart", routeChangeStartEvent);

    const unloadEvent = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
      }
    };
    window.addEventListener("beforeunload", unloadEvent);

    return () => {
      router.events.off("routeChangeStart", routeChangeStartEvent);
      window.removeEventListener("beforeunload", unloadEvent);
    };
  }, [router, unsavedChanges]);
};

export default useUnsavedChangesWarning;

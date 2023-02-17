import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import type { EventFormProps } from "./event-form";

const EventForm = dynamic(() => import("./event-form"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <FontAwesomeIcon icon={faSpinner} pulse size="2x" color="white" />
    </div>
  ),
});

const DynamicEventForm: React.FC<EventFormProps> = (props) => {
  return <EventForm {...props} />;
};

export default DynamicEventForm;

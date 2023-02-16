import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../components/admin-page";
import DynamicEventForm from "../../components/dynamic-event-form";
import { type HandleEventSubmit } from "../../components/event-form";
import HomeContent from "../../components/home-content";

const EditHome: NextPage = () => {
  const { data: session } = useSession();

  const handleSubmit: HandleEventSubmit = (
    title,
    content,
    contentText,
    date
  ) => {
    return;
  };

  return (
    <AdminPage session={session}>
      <DynamicEventForm
        handleSubmit={handleSubmit}
        saveButtonText="Tallenna"
        isLoading={false}
        Preview={HomeContent}
      />
    </AdminPage>
  );
};

export default EditHome;

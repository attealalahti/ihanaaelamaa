import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminPage from "../../../components/admin/admin-page";
import SponsorForm from "../../../components/admin/sponsor-form";

const NewSponsor: NextPage = () => {
  const { data: session } = useSession();

  return (
    <AdminPage session={session} backHref="/admin/sponsors">
      <SponsorForm />
    </AdminPage>
  );
};

export default NewSponsor;

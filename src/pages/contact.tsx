import { type NextPage } from "next";
import Header from "../components/layout/header";
import SocialButton from "../components/control/social-button";
import emailIcon from "../../public/images/email_icon.svg";
import instagramIcon from "../../public/images/instagram_logo.svg";
import facebookIcon from "../../public/images/facebook_logo.svg";
import Footer from "../components/layout/footer";
import Page from "../components/layout/page";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../server/trpc/router/_app";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import CustomHead from "../components/layout/custom-head";

export const getStaticProps = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.sponsor.all.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Contact: NextPage = () => {
  return (
    <>
      <CustomHead title="Yhteystiedot" />
      <Page>
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 text-white lg:gap-6">
          <h1 className="my-10 text-4xl font-bold tracking-tight lg:text-5xl">
            Yhteystiedot
          </h1>
          <div className="mb-10 flex flex-col gap-6">
            <SocialButton
              text="burleskia@ihanaaelamaa.fi"
              imageSrc={emailIcon}
              imageAlt="Sähköposti"
              href="mailto:burleskia@ihanaaelamaa.fi"
            />
            <SocialButton
              text="facebook.com/ihanaaelamaa"
              imageSrc={facebookIcon}
              imageAlt="Facebook"
              href="https://www.facebook.com/ihanaaelamaa/"
            />
            <SocialButton
              text="@ihanaaelamaayhdistys"
              imageSrc={instagramIcon}
              imageAlt="Instagram"
              href="https://www.instagram.com/ihanaaelamaayhdistys/"
            />
          </div>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Contact;

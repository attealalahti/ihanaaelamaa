import { type NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";
import SocialButton from "../components/social-button";
import emailIcon from "../../public/images/email_icon.svg";
import instagramIcon from "../../public/images/instagram_logo.svg";
import facebookIcon from "../../public/images/facebook_logo.svg";
import Footer from "../components/footer";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-900 to-green-700">
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
      </div>
    </>
  );
};

export default Contact;

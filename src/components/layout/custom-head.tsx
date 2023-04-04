import Head from "next/head";

type Props = {
  title?: string;
};

const CustomHead: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>
        {title ? `${title} | Ihanaa Elämää ry` : "Ihanaa Elämää ry"}
      </title>
      <meta name="description" content="Burleskiyhdistys" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;

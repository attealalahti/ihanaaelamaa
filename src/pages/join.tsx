import { type NextPage } from "next";
import Header from "../components/header";
import Image from "next/image";
import joinImage from "../../public/images/liity.jpg";
import Head from "next/head";

const Join: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-rose-900 to-violet-900">
        <Header />
        <main className="flex flex-1 flex-wrap items-center justify-center">
          <div className="m-10 flex max-w-4xl flex-col gap-10 text-white md:gap-16">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Liity IE Burleskipoppoon jäseneksi!
            </h1>
            <div className="flex flex-col gap-6 text-lg lg:text-xl">
              <p>
                Ihanaa Elämää ry on yhdistys, jonka alun perin perusti suurehko
                kaveriporukka ympäri Suomen, jotka haluavat tarjota mielekästä
                ja hauskaa vapaa-ajan tekemistä aikuisikäisille.
              </p>
              <p>
                IE Burleskipoppoo on osa yhdistyksen toimintaa ja
                puuhahenkilöidensä kotipaikan mukaan vaikuttaa eniten
                Etelä-Pohjanmaalla, mutta tokikaan toiminta muuallakaan päin
                Suomea ei ole poissuljettu.
              </p>
              <p>
                Pyrimme jatkossa järkeistämään IE Burleskipoppoon toimintaa
                siten, että tiedämme aidosti jäsenemme ja suuntaamme toimintaa
                heille. Siksi pyydämmekin sinua liittymään IE
                Burleskipoppooseen. Burleskipoppoo toimii itsenäisenä
                alaosastona Ihanaa Elämää ry:ssä ja sen myötä jäsenyys IE
                Burleskipoppoossa tarkoittaa kannatusjäsenyyttä Ihanaa Elämää
                ry:ssä. Myös IE Burleskipoppoon infokirje postitetaan jatkossa
                vain jäsenille.
              </p>
            </div>
            <h2 className="text-xl font-bold lg:text-2xl">
              Yksityishenkilön kannatusjäsenyys maksaa 5 euroa vuonna 2022.
            </h2>
            <div className="flex flex-col gap-6 text-lg lg:text-xl">
              <p className="font-bold">
                Jos haluat liittyä IE Burleskipoppooseen, toimi näin:
              </p>
              <p>
                1) Täytä jäsentietolomake tästä linkistä{" "}
                <a
                  href="https://forms.gle/mpbTfS9tzJ2yLFav6"
                  className="text-blue-300 hover:underline"
                >
                  https://forms.gle/mpbTfS9tzJ2yLFav6
                </a>
              </p>
              <p>
                2) Lähetämme sinulle tiedot kannatusjäsenmaksun maksamista
                varten.
              </p>
            </div>
          </div>
          <Image
            src={joinImage}
            alt="Tule mukaan kannattajajäseneksi, vuosimaksu 5 euroa - no, mitä sillä saa? Jäsenemme ovat etusijalla Burleski-iltojen esiintyjävalinnoissa! Jäsenille tarjoamme mm. alennuksia työpajoista. Jäsenenä olet postituslistoillamme ja tiedät ensimmäisenä, mitä tapahtuu."
            width={500}
            className="m-10 shadow-md shadow-black"
          />
        </main>
      </div>
    </>
  );
};

export default Join;

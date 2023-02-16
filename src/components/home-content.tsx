import { type PostProps } from "./post";

const HomeContent: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="flex max-w-4xl flex-col items-center justify-center gap-16 p-16 px-8 text-center text-white">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        Tervetuloa sivuillemme!
      </h1>
      <div className="flex flex-col gap-6 text-lg lg:text-xl">
        <p>
          Ihanaa Elämää ry:n Burleskipoppoon tarkoituksena on ylläpitää sekä
          edistää aikuisten monipuolista harrastus- ja vapaa-ajantoimintaa,
          iloista ja positiivista ajattelua, elämänasennetta ja hauskanpitoa.
          Toimintaa on ympäri Suomen.
        </p>
        <p>
          Jos sinulla on hyvä idea, ota yhteyttä{" "}
          <a
            href="mailto:burleskia@ihanaaelamaa.fi"
            className="text-blue-300 hover:underline"
          >
            burleskia@ihanaaelamaa.fi
          </a>
        </p>
        <p>
          The Hard Days Night -burleski-illat ovat monipuolisia ja
          elämyksellisiä tapahtumia vaihtuvin teemoin.
        </p>
        <p>
          Lavalle nousevat niin uudet tulokkaat kuin pidempään esiintyneet
          artistitkin.
        </p>
        <p>
          Jäsenemme ovat etusijalla esiintyjävalinnoissa! Älä epäröi ottaa
          yhteyttä jos haluat nousta lavalle!
        </p>
      </div>
    </div>
  );
};

export default HomeContent;

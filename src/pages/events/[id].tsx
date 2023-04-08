import type {
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Page from "../../components/layout/page";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import { createContext } from "../../server/trpc/context";
import superjson from "superjson";
import { prisma } from "../../server/db/client";
import { trpc } from "../../utils/trpc";
import Custom404 from "../../components/layout/custom-404";
import Post from "../../components/content/post";
import BackButton from "../../components/control/back-button";
import CustomHead from "../../components/layout/custom-head";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const id = Number(context.params?.id);

  await ssg.event.byIdVisible.prefetch({ id });
  await ssg.sponsor.all.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await prisma.event.findMany({
    select: { id: true },
    where: { visible: true },
  });
  return {
    paths: events.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: "blocking",
  };
};

const Event: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const event = trpc.event.byIdVisible.useQuery({ id }, { enabled: false });

  if (!event.data) return <Custom404 />;
  return (
    <>
      <CustomHead title={event.data.title} />
      <Page>
        <Header />
        <BackButton href="/events" text="Kaikki tapahtumat" />
        <main className="flex w-full flex-1 flex-col">
          <Post
            data={{
              ...event.data,
              imageUrl: event.data.image?.url ?? null,
            }}
          />
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Event;

import { useLoaderData } from "react-router";
import { generatePics } from "../lib/generatePics";
import { SimpleAnimatedGallery } from "~/components/SimpleAnimatedGallery";

export const clientLoader = () => {
  return { pics: generatePics() };
};

export default function Page() {
  const { pics } = useLoaderData<typeof loader>();

  return (
    <article className="bg-white grid place-content-center h-screen">
      <h1 className="text-4xl font-bold py-2 text-center">
        Qué opinan nuestros estudiantes
      </h1>
      <p className="text-center text-xl pb-6 font-thin">
        Si las imagenes se repiten se buguea 🤬
      </p>
      <SimpleAnimatedGallery delay={2} pics={pics} />
    </article>
  );
}

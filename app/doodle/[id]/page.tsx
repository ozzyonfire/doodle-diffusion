import Diffusion from "@/components/Diffusion";
import Prompt from "@/components/Prompt";
import { getDoodle } from "@/model/doodle";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: {
  params: {
    id: string;
  }
}): Promise<Metadata> {
  const { id } = params;
  const doodle = await getDoodle(id);

  if (!doodle) return Promise.reject(new Error('Error getting doodle.'));

  return {
    title: "Doodle Diffusion",
    description: doodle.prompt,
    openGraph: {
      title: "Doodle Diffusion",
      description: doodle.prompt,
      images: [
        {
          url: doodle.input,
          width: 512,
          height: 512,
          alt: doodle.prompt,
        },
        {
          url: doodle.output,
          width: 512,
          height: 512,
          alt: doodle.prompt,
        },
      ],
    },
  };
}

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const { id } = params;
  const doodle = await getDoodle(id);

  if (!doodle) {
    return (
      <>
        <Prompt prompt='Error getting doodle.' />
      </>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Prompt prompt={doodle.prompt} />
      <Diffusion
        doodle={JSON.parse(JSON.stringify(doodle))}
      />
      <div className="text-center">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Go Doodle!
        </Link>
      </div>
    </div>
  )
}
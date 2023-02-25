import Diffusion from "@/components/Diffusion";
import Prompt from "@/components/Prompt";
import { getDoodle } from "@/model/doodle";

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
    <>
      <Prompt prompt={doodle.prompt} />
      <Diffusion
        doodle={JSON.parse(JSON.stringify(doodle))}
      />
    </>
  )
}
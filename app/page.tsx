import Prompt, { getPrompt } from "@/components/Prompt";
import SketchCanvas from "./SketchCanvas";

export default async function Home() {
  const prompt = await getPrompt();

  return (
    <>
      <Prompt prompt={prompt} />
      <SketchCanvas prompt={prompt} />
    </>
  )
}

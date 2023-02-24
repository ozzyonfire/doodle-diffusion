import Prompt, { getPrompt } from "@/components/Prompt";
import { Main } from "./Main";

export default async function Home() {
  const prompt = await getPrompt();

  return (
    <>
      <Prompt prompt={prompt} />
      <Main prompt={prompt} />
    </>
  )
}

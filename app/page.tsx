import Prompt from "@/components/Prompt";
import { getDailyPrompt } from "@/model/prompt";
import { Main } from "./Main";

export default async function Home() {
  const prompt = await getDailyPrompt();

  return (
    <>
      <Prompt prompt={prompt} />
      <Main prompt={prompt} />
    </>
  )
}

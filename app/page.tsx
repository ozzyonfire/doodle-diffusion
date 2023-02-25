import Prompt from "@/components/Prompt";
import { getDailyPrompt } from "@/model/prompt";
import { Metadata } from "next";
import { Main } from "./Main";

export const metadata: Metadata = {
  title: "Doodle Diffusion",
  description: "A daily doodle generator.",
}

export default async function Home() {
  const prompt = await getDailyPrompt();

  return (
    <>
      <Prompt prompt={prompt} />
      <Main prompt={prompt} />
    </>
  )
}

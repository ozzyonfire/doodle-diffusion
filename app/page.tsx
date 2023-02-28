import Prompt from "@/components/Prompt";
import { getDailyPrompt } from "@/model/prompt";
import { Metadata } from "next";
import { Main } from "./Main";

export const revalidate = 3600; // revalidate every hour

export const metadata: Metadata = {
  title: "Doodle Diffusion",
  description: "A daily doodle generator.",
}

export default async function Home() {
  const prompt = await getDailyPrompt();

  return (
    <div className="flex flex-col items-center gap-2">
      <Prompt prompt={prompt} />
      <Main prompt={prompt} />
    </div>
  )
}

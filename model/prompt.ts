import { getPrompt } from "@/components/Prompt";
import { Collection } from "mongodb";
import connect from "./_connect";

let collection: Collection<Prompt>;

interface Prompt {
  date: string,
  prompt: string,
}

async function getCollection() {
  const db = await connect();
  return db.collection<Prompt>("prompts");
}

export async function getDailyPrompt() {
  if (!collection) {
    collection = await getCollection();
  }
  // find today's prompt, if it doesn't exist, create it
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const prompt = await collection.findOne({ date: todayString });
  if (prompt) {
    return prompt.prompt;
  } else {
    const newPrompt = await getPrompt();
    const response = await collection.insertOne({ date: todayString, prompt: newPrompt });
    console.log(response);
    return newPrompt;
  }
}
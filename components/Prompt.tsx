import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(config);

const fallbackPrompts = [
  "A wizard who has lost his wand",
  "A pirate with a pet parrot",
  "A mermaid playing basketball",
  "A dinosaur riding a bicycle",
  "A snowman on vacation",
  "A robot doing laundry",
  "A cat playing chess with a mouse",
  "A monster at a tea party",
  "A treehouse with a secret room",
  "A robot with a jetpack",
];

export async function getPrompt() {
  const prompt = "Provide a single funny prompt that can be used to draw a simple image. The prompt would result in a hilarious and enjoyable picture to be draw - like Drawful. The prompt should be short and simple enough to draw easily. Example: A monster at a tea party \n\n";

  try {
    const response = await openai.createCompletion({
      prompt: prompt,
      model: 'text-davinci-003',
      max_tokens: 1024,
    });

    return response.data.choices[0].text || fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
  } catch (error) {
    console.error((error as any).response.data.error);
    // fallback to a random prompt
    return fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
  }
};

export default function Prompt(props: {
  prompt: string,
}) {
  const { prompt } = props;

  // render the prompt in nice big bold text
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-white">
        {prompt}
      </h1>
    </div>
  )
}
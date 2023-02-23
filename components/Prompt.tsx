import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(config);

export async function getPrompt() {
  const prompt = "Provide a single funny prompt that can be used to draw a simple image. The prompt would result in a hilarious and enjoyable picture to be draw - like Drawful. Example: A monster at a tea party \n\n";

  const response = await openai.createCompletion({
    prompt: prompt,
    model: 'text-davinci-003',
    max_tokens: 1024,
  });

  return response.data.choices[0].text || "No prompt found";
};

export default function Prompt(props: {
  prompt: string,
}) {
  const { prompt } = props;

  // render the prompt in nice big bold text
  return (
    <div className="flex flex-col items-center justify-center h-full my-4">
      <h1 className="text-2xl font-bold text-white">
        {prompt}
      </h1>
    </div>
  )
}
import { Doodle, saveDoodle } from "@/model/doodle";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // if this is a POST request, save the doodle to the database
  if (req.method === "POST") {
    const { input, output, prompt, predictionId } = req.body;

    const doodle: Doodle = {
      date: new Date().toISOString(),
      prompt,
      input,
      output,
      predictionId
    };

    const response = await saveDoodle(doodle);
    res.status(200).json(response);
  } else {
    res.status(404).send("Not found");
  }
};

export default handler;
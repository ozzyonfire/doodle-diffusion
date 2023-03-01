import { Doodle, saveDoodle } from "@/model/doodle";
import { NextApiHandler } from "next";

// only use this API enpoint when creating a new doodle
const handler: NextApiHandler = async (req, res) => {
  // if this is a POST request, save the doodle to the database
  if (req.method === "POST") {
    const { input, output, prompt, predictionId, userId } = req.body;

    const doodle: Doodle = {
      date: new Date().toISOString(),
      prompt,
      input,
      output,
      predictionId,
      userId,
      upvotes: [], // todo: make it so we don't overwrite the upvotes on a save
      downvotes: []
    };

    const response = await saveDoodle(doodle);
    res.status(200).json(response);
  } else {
    res.status(404).send("Not found");
  }
};

export default handler;
import { getScore } from "@/model/doodle";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const score = await getScore(id as string);
    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export default handler;
import { getTopDoodles } from "@/model/doodle";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { date } = req.query;
    const doodles = await getTopDoodles(date as string || new Date().toISOString());
    res.status(200).json(doodles);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export default handler;
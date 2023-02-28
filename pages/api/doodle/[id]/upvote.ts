import { upvote } from "@/model/doodle";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // if this is a POST request, upvote the doodle
  if (req.method === "POST") {
    const { id } = req.query;
    try {
      const doodle = await upvote(id as string, req.body.userId);
      return res.status(200).json(doodle);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
};

export default handler;
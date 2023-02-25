import { getDoodle, getDoodleForUser } from "@/model/doodle";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // if this is a GET request, return the doodle from the database
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const doodle = await getDoodleForUser(id as string);
      return res.status(200).json(doodle);
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    res.status(404).send("Not found");
  }
};

export default handler;
import { NextApiHandler } from "next";
import { apiUrl, token } from "./index";

const handler: NextApiHandler = async (req, res) => {
  const response = await fetch(`${apiUrl}/${req.query.id}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    let error = await response.json();
    console.log('error', error);
    res.statusCode = 500;
    res.json({ detail: error.detail });
    return;
  }

  const prediction = await response.json();
  return res.json(prediction);
}

export default handler;
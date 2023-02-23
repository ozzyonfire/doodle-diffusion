import { NextApiHandler } from "next";

const API_HOST = "https://api.replicate.com";

const handler: NextApiHandler = async (req, res) => {
  const response = await fetch(`${API_HOST}/v1/predictions/${req.query.id}`, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    let error = await response.json();
    res.statusCode = 500;
    res.json({ detail: error.detail });
    return;
  }

  const prediction = await response.json();
  return res.json(prediction);
}

export default handler;
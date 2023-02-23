import { NextApiHandler } from "next";

const apiUrl = "https://api.replicate.com/v1/predictions";
const token = process.env.REPLICATE_API_KEY;

const version = "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117";

const handler: NextApiHandler = async (req, res) => {
  const input = req.body;

  const body = JSON.stringify({
    input,
    version,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    return res.end(JSON.stringify({ detail: error.detail }));
  }

  const prediction = await response.json();
  console.log(prediction);
  return res.json(prediction);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default handler;
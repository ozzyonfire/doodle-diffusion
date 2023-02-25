// upload an image to S3

import { S3 } from "aws-sdk";
import { NextApiHandler } from "next";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const handler: NextApiHandler = async (req, res) => {
  const { image, url } = req.body; // image is a base64 encoded string

  if (image) {
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");

    const params: S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME || "ec-doodle",
      Key: `images/${Date.now()}.png`,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: "image/png",
      ACL: "public-read",
    };

    const response = await s3.upload(params).promise();

    return res.json(response);
  } else if (url) {
    // the url is an image, we want to save it to S3 and return the new url
    // we need to download the image first, then upload it to S3

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    const params: S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME || "ec-doodle",
      Key: `images/${Date.now()}.png`,
      Body: imageBuffer,
      ContentEncoding: "base64",
      ContentType: "image/png",
      ACL: "public-read",
    };

    const response = await s3.upload(params).promise();

    return res.json(response);
  }

  return res.json({ detail: "no image or url provided" });
};

export default handler;

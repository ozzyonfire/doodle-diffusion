// client side helper to send the image to the server

import { S3 } from "aws-sdk";

export async function uploadImage(input: {
  image?: string; // base64 encoded image
  url?: string; // the url to the file
}) {
  const response = await fetch("/api/s3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await response.json() as S3.ManagedUpload.SendData;
  return data;
}
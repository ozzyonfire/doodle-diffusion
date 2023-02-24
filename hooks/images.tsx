// client side helper to send the image to the server

import { S3 } from "aws-sdk";

export async function uploadImage(image: string) {
  const response = await fetch("/api/s3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });
  const data = await response.json() as S3.ManagedUpload.SendData;
  return data;
}
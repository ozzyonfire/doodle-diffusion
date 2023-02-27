'use client';

import Diffusion from "@/components/Diffusion";
import Sketch from "@/components/Sketch";
import { getDoodleForUser, saveDoodle } from "@/hooks/doodle";
import { uploadImage } from "@/hooks/images";
import { submitPrediction, usePrediction } from "@/hooks/predictions";
import { useUserId } from "@/hooks/user";
import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";

export function Main(props: {
  prompt: string;
}) {
  const { prompt } = props;
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [doodle, setDoodle] = useState<WithId<Doodle> | null>(null);
  const [predictionStatus, setPredictionStatus] = useState<null | "starting" | "processing" | "succeeded" | "error">(null);
  const userId = useUserId();
  const {
    data: prediction
  } = usePrediction(predictionId || "", {
    refreshInterval: predictionStatus === "processing" || predictionStatus === "starting" ? 1000 : 0,
  });

  useEffect(() => {
    if (userId) {
      // get the doodle from the database for the user and for today
      getDoodleForUser(userId).then(doodle => {
        if (doodle) {
          setDoodle(doodle);
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    if (prediction) {
      setPredictionStatus(prediction.status);

      if (prediction.status == "succeeded" && prediction.output) {
        // the output is an array of two images, the first is the original image and the second is the generated image
        // we want to send the generated image to S3 and save the url to the database
        uploadImage({
          url: prediction.output[1],
        }).then(async response => {
          // save the doodle to the database
          const saveResponse = await saveDoodle({
            prompt: prediction.input.prompt,
            input: prediction.input.image,
            output: response.Location,
            predictionId: prediction.id,
            userId: userId || "",
            upvotes: [userId || ""],
            downvotes: [],
          });
          setDoodle(saveResponse);
        });
      }
    }
  }, [prediction, userId]);

  const handleSubmitImage = async (url: string, additionalPrompt: string) => {
    // send the prompt and the image url to the replicate server
    setPredictionStatus("starting");
    const predictionResponse = await submitPrediction({
      prompt,
      image: url,
      a_prompt: additionalPrompt,
      ddim_steps: 30,
    });
    setPredictionId(predictionResponse.id);
  }

  if (doodle) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <Diffusion
          doodle={doodle}
        />
        <div className="text-center max-w-[512px]">
          <p className="text-gray-200">
            Thank you for your daily doodle! Share this doodle with your friends!
          </p>
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={() => setDoodle(null)}
        >
          Reset
        </button>
      </div>
    )
  }

  return (
    <Sketch
      onSubmit={handleSubmitImage}
      isProcessing={predictionStatus === "processing" || predictionStatus === "starting"}
    />
  )
}
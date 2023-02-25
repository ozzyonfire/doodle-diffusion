'use client';

import Diffusion from "@/components/Diffusion";
import Sketch from "@/components/Sketch";
import { getDoodleForUser, saveDoodle } from "@/hooks/doodle";
import { uploadImage } from "@/hooks/images";
import { submitPrediction, usePrediction } from "@/hooks/predictions";
import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function Main(props: {
  prompt: string;
}) {
  const { prompt } = props;
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [doodle, setDoodle] = useState<WithId<Doodle> | null>(null);
  const [predictionStatus, setPredictionStatus] = useState<null | "starting" | "processing" | "succeeded" | "error">(null);
  const {
    data: prediction
  } = usePrediction(predictionId || "", {
    refreshInterval: predictionStatus === "processing" || predictionStatus === "starting" ? 1000 : 0,
  });

  useEffect(() => {
    // store a uuid to track the user in the database
    if (!localStorage.getItem("userId")) {
      const uuid = uuidv4();
      localStorage.setItem("userId", uuid);
    }
    setUserId(localStorage.getItem("userId"));
  }, []);

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
          <p>
            Thank you for your doodle! You can share this doodle with your friends by clicking the share button. You can only submit one doodle per day.
          </p>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
            onClick={() => setDoodle(null)}
          >
            Reset
          </button>
        </div>
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
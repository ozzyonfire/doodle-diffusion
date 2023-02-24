'use client';

import Diffusion from "@/components/Diffusion";
import Sketch from "@/components/Sketch";
import { submitPrediction, usePrediction } from "@/hooks/predictions";
import { useEffect, useState } from "react";

export function Main(props: {
  prompt: string;
}) {
  const { prompt } = props;
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [predictionStatus, setPredictionStatus] = useState<null | "starting" | "processing" | "succeeded" | "error">(null);
  const {
    data: prediction
  } = usePrediction(predictionId || "", {
    refreshInterval: predictionStatus === "processing" || predictionStatus === "starting" ? 1000 : 0,
  });

  useEffect(() => {
    if (prediction) {
      setPredictionStatus(prediction.status);
    }
  }, [prediction]);

  useEffect(() => {
    // check if there is a prediction id in local storage
    const id = localStorage.getItem("predictionId");
    if (id) {
      setPredictionId(id);
    }
  }, []);

  const handleSubmitImage = async (url: string, additionalPrompt: string) => {
    // send the prompt and the image url to the replicate server
    const predictionResponse = await submitPrediction({
      prompt,
      image: url,
      a_prompt: additionalPrompt,
      ddim_steps: 30,
    });

    setPredictionId(predictionResponse.id);
    localStorage.setItem("predictionId", predictionResponse.id);
  }

  if (prediction && prediction.status === "succeeded") {
    return (
      <Diffusion
        prediction={prediction}
        onReset={() => {
          setPredictionId(null);
          localStorage.removeItem("predictionId");
        }}
      />
    )
  }

  return (
    <Sketch
      onSubmit={handleSubmitImage}
      isProcessing={predictionStatus === "processing" || predictionStatus === "starting"}
    />
  )
}
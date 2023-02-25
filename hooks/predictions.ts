import useSWR, { SWRConfiguration } from "swr";

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
}

export function usePrediction(id: string, options?: SWRConfiguration) {
  return useSWR<PredictionResponse>(id && `/api/replicate/${id}`, fetcher, options);
}

export interface PredictionBody {
  prompt: string;
  image: string; // the url to the file
  num_samples?: number;
  ddim_steps?: number;
  scale?: number;
  a_prompt?: string;
  n_prompt?: string;
}

export interface PredictionResponse {
  id: string;
  completed_at: string;
  created_at: string;
  error: string;
  logs: string;
  input: PredictionBody;
  output: string[];
  started_at: string;
  status: "processing" | "succeeded" | "error";
  version: string;
  urls: {
    cancel: string;
    get: string;
  };
}

export async function submitPrediction(body: PredictionBody) {
  const response = await fetch("/api/replicate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json() as PredictionResponse;
  return data;
}
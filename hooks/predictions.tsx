import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
}

export function usePrediction(id: string) {
  return useSWR(`/api/replicate/${id}`, fetcher);
}

export interface PredictionBody {
  prompt: string;
  image: string; // the url to the file
}

export async function submitPrediction(body: PredictionBody) {
  const response = await fetch("/api/replicate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}
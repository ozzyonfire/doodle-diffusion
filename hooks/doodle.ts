import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import useSWR from "swr";

export async function useDoodle(id: string) {
  return useSWR(id && `/api/doodle/${id}`);
}

export interface DoodleInput extends Omit<Doodle, "date"> { }

export async function saveDoodle(doodle: DoodleInput) {
  const response = await fetch("/api/doodle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doodle),
  });
  const data = await response.json() as WithId<Doodle>;
  return data;
}
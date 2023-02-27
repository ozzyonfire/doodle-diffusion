import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import useSWR from "swr";
import { fetcher } from "./predictions";

export async function useDoodle(id: string) {
  return useSWR(id && `/api/doodle/${id}`, fetcher);
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

export async function getDoodleForUser(userId: string) {
  const response = await fetch(`/api/doodle/user/${userId}`);
  const data = await response.json() as WithId<Doodle>;
  return data;
}

export async function upvote(id: string, userId: string) {
  const response = await fetch(`/api/doodle/${id}/upvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json() as WithId<Doodle>;
  return data;
}

export async function downvote(id: string, userId: string) {
  const response = await fetch(`/api/doodle/${id}/downvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json() as WithId<Doodle>;
  return data;
}

export function useScore(id: string) {
  return useSWR<number>(id && `/api/doodle/${id}/score`, fetcher);
}

export function useTopDoodles(date: string) {
  return useSWR<WithId<Doodle>[]>(date && `/api/doodle/top?date=${date}`, fetcher);
}
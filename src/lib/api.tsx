import { IFitlog } from "@/Types/types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<IFitlog[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch workouts: ${res.status}`);
  return res.json();
}

export async function getWorkoutById(id: string): Promise<IFitlog | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch workout ${id}: ${res.status}`);
  return res.json();
}
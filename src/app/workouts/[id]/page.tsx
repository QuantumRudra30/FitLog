import { notFound } from "next/navigation";
import WorkoutDetails from "@/components/workout/WorkoutDetails";
import { IFitlog } from "@/Types/types";

const getWorkout = async (id: string): Promise<IFitlog | null> => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workouts: ${response.status}`);
  }

  const workouts: IFitlog[] = await response.json();
  const workout = workouts.find((w) => String(w.id) === id);

  return workout ?? null;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);
  return { title: workout ? `${workout.name} — FitLog` : "Workout — FitLog" };
}

const WorkoutDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
};

export default WorkoutDetailsPage;
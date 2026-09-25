import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/shared/WorkoutCard";

export default async function WorkoutsPage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
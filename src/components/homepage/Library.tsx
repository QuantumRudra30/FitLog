import WorkoutCard from "@/components/shared/WorkoutCard";
import { IFitlog } from "@/Types/types";

const getWorkouts = async (): Promise<IFitlog[]> => {
  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-sm text-base-content/50">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
  );
};

export default Library;

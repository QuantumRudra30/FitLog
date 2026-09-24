import Image from "next/image";
import Link from "next/link";

import { FiClock, FiStar } from "react-icons/fi";
import { MdLocalFireDepartment } from "react-icons/md";

import { IFitlog } from "@/Types/types";

interface WorkoutCardProps {
  workout: IFitlog;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-base-300 bg-base-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-lime-400/40"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient blend so image melts into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/10 to-transparent" />

        {/* Inner shadow for depth / makes badges pop */}
        <div className="absolute inset-0 shadow-[inset_0_-50px_50px_-30px_rgba(0,0,0,0.5)]" />

        {/* Muscle Tags — overlaid on image, bottom-left */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-lime-400 px-2 py-1 text-[9px] font-extrabold uppercase text-black shadow-sm"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Workout Name */}
        <h3 className="text-base font-extrabold uppercase text-base-content">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-xs text-base-content/50">
          {workout.equipment}
        </p>

        <div className="my-3 border-t border-base-300" />

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-base-content/60">
          <span className="flex items-center gap-1">
            <FiClock size={13} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <MdLocalFireDepartment size={15} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <FiStar size={13} className="fill-yellow-400 text-yellow-400" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
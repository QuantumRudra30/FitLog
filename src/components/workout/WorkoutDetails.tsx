"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import { FiClock, FiStar, FiBookmark, FiPlusCircle } from "react-icons/fi";
import { MdLocalFireDepartment } from "react-icons/md";
import { IFitlog } from "@/Types/types";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetailsProps {
  workout: IFitlog;
}

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const { addToPlan, saveForLater } = usePlan();

  const {
    name,
    image,
    muscleGroups,
    equipment,
    difficulty,
    duration,
    caloriesBurned,
    sets,
    reps,
    rating,
    description,
    instructions,
  } = workout;

  const specRows: [string, string][] = [
    ["Equipment", equipment],
    ["Difficulty", difficulty],
    ["Sets", String(sets)],
    ["Reps", reps],
    ["Duration", `${duration} min`],
    ["Calories", `${caloriesBurned} kcal`],
    ["Rating", rating.toFixed(1)],
  ];

  const handleAddToPlan = () => {
    addToPlan(workout);
    toast.success(`Added "${name}" to today's plan`);
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    toast.info(`Saved "${name}" for later`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-base-content sm:px-6 sm:py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        {/* Left: image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-base-300 bg-base-200 md:aspect-[4/5]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right: content */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl md:text-4xl">
            {name}
          </h1>
          <p className="mt-3 text-sm text-base-content/60 sm:text-base">{description}</p>

          {/* Muscle group tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-extrabold uppercase text-black shadow-sm"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Specs table */}
          <div className="mt-6 overflow-hidden rounded-xl border border-base-300">
            {specRows.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-3 py-2.5 bg-base-200 sm:px-4 sm:py-3 ${
                  i !== specRows.length - 1 ? "border-b border-base-300" : ""
                }`}
              >
                <span className="text-[11px] font-medium uppercase tracking-wide text-base-content/50 sm:text-xs">
                  {label}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-base-content">
                  {label === "Rating" && (
                    <FiStar size={13} className="fill-yellow-400 text-yellow-400" />
                  )}
                  {label === "Duration" && <FiClock size={13} />}
                  {label === "Calories" && <MdLocalFireDepartment size={15} />}
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-sm font-extrabold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2">
              {instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-base-content/70">
                  <span className="font-semibold text-base-content/40">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleAddToPlan}
              className="btn w-full border-none bg-lime-400 text-black hover:bg-lime-500 sm:w-auto"
            >
              <FiPlusCircle size={16} />
              Add to today&apos;s plan
            </button>
            <button
              onClick={handleSaveForLater}
              className="btn btn-outline w-full border-base-300 text-base-content hover:bg-base-300 sm:w-auto"
            >
              <FiBookmark size={16} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
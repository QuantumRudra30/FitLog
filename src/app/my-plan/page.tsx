"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiClock, FiStar, FiCheckCircle, FiX } from "react-icons/fi";
import { MdLocalFireDepartment } from "react-icons/md";
import { usePlan } from "@/context/PlanContext";
import { IFitlog } from "@/Types/types";

type Tab = "today" | "saved";
type SortKey = "duration" | "calories" | "rating" | "name";

function sortFn<T extends { duration?: number; caloriesBurned?: number; rating: number; name: string }>(
  sortKey: SortKey
) {
  return (a: T, b: T) => {
    switch (sortKey) {
      case "duration":
        return (a.duration ?? 0) - (b.duration ?? 0);
      case "calories":
        return (a.caloriesBurned ?? 0) - (b.caloriesBurned ?? 0);
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
    }
  };
}

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const [tab, setTab] = useState<Tab>("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const totals = useMemo(() => {
    const exercises = planItems.length;
    const minutes = planItems.reduce((sum, i) => sum + i.workout.duration, 0);
    const calories = planItems.reduce((sum, i) => sum + i.workout.caloriesBurned, 0);
    return { exercises, minutes, calories };
  }, [planItems]);

  const sortedPlanItems = useMemo(() => {
    return [...planItems].sort((a, b) => sortFn<IFitlog>(sortKey)(a.workout, b.workout));
  }, [planItems, sortKey]);

  const sortedSavedItems = useMemo(() => {
    return [...savedItems].sort(sortFn<IFitlog>(sortKey));
  }, [savedItems, sortKey]);

  const isEmpty = tab === "today" ? planItems.length === 0 : savedItems.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 text-base-content sm:px-6 sm:py-10">
      <h1 className="text-2xl font-extrabold uppercase sm:text-3xl md:text-4xl">My Plan</h1>
      <p className="mt-1 text-sm text-base-content/60 sm:text-base">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Stats bar */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-base-300 rounded-xl border border-base-300 bg-base-200">
        <div className="px-3 py-3 sm:px-6 sm:py-4">
          <p className="text-[10px] uppercase tracking-wide text-base-content/50 sm:text-xs">
            Exercises
          </p>
          <p className="mt-1 text-xl font-extrabold text-lime-400 sm:text-2xl">
            {totals.exercises}
          </p>
        </div>
        <div className="px-3 py-3 sm:px-6 sm:py-4">
          <p className="text-[10px] uppercase tracking-wide text-base-content/50 sm:text-xs">
            Minutes
          </p>
          <p className="mt-1 text-xl font-extrabold sm:text-2xl">{totals.minutes}</p>
        </div>
        <div className="px-3 py-3 sm:px-6 sm:py-4">
          <p className="text-[10px] uppercase tracking-wide text-base-content/50 sm:text-xs">
            Calories
          </p>
          <p className="mt-1 text-xl font-extrabold sm:text-2xl">{totals.calories}</p>
        </div>
      </div>

      {/* Tabs + sort */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("today")}
            className={`btn btn-sm ${
              tab === "today" ? "border-none bg-lime-400 text-black" : "btn-ghost"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`btn btn-sm ${
              tab === "saved" ? "border-none bg-lime-400 text-black" : "btn-ghost"
            }`}
          >
            Saved
          </button>
        </div>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="select select-sm select-bordered w-full bg-base-200 sm:w-auto"
        >
          <option value="duration">Sort by Duration</option>
          <option value="calories">Sort by Calories</option>
          <option value="rating">Sort by Rating</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* List / empty state */}
      <div className="mt-4 overflow-hidden rounded-xl border border-base-300 bg-base-200">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center sm:py-20">
            <p className="text-lg font-bold">Nothing here yet</p>
            <p className="max-w-xs text-sm text-base-content/50">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/workouts"
              className="btn mt-2 border-none bg-lime-400 text-black hover:bg-lime-500"
            >
              Go to workouts
            </Link>
          </div>
        ) : tab === "today" ? (
          sortedPlanItems.map(({ workout, done }) => (
            <div
              key={workout.id}
              className="flex flex-col gap-3 border-b border-base-300 px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`font-bold ${done ? "text-base-content/40 line-through" : ""}`}>
                    {workout.name}
                  </p>
                  <p className="text-xs text-base-content/50">{workout.equipment}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-base-content/60 sm:gap-4">
                <span className="flex items-center gap-1">
                  <FiClock size={12} /> {workout.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <MdLocalFireDepartment size={13} /> {workout.caloriesBurned} kcal
                </span>
                <span className="flex items-center gap-1">
                  <FiStar size={12} className="fill-yellow-400 text-yellow-400" /> {workout.rating}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:ml-auto">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="btn btn-xs btn-outline border-base-300"
                >
                  View Details
                </Link>

                <button
                  onClick={() => {
                    toggleDone(workout.id);
                    if (!done) toast.success(`"${workout.name}" marked as done 💪`);
                  }}
                  className={`btn btn-xs border-none ${
                    done ? "bg-base-300 text-base-content" : "bg-lime-400 text-black hover:bg-lime-500"
                  }`}
                >
                  <FiCheckCircle size={13} />
                  {done ? "Done" : "Mark as Done"}
                </button>

                <button
                  onClick={() => {
                    removeFromPlan(workout.id);
                    toast.info(`Removed "${workout.name}" from today's plan`);
                  }}
                  className="text-base-content/40 hover:text-base-content"
                  aria-label="Remove"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          sortedSavedItems.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-col gap-3 border-b border-base-300 px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold">{workout.name}</p>
                  <p className="text-xs text-base-content/50">{workout.equipment}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-base-content/60 sm:gap-4">
                <span className="flex items-center gap-1">
                  <FiClock size={12} /> {workout.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <MdLocalFireDepartment size={13} /> {workout.caloriesBurned} kcal
                </span>
                <span className="flex items-center gap-1">
                  <FiStar size={12} className="fill-yellow-400 text-yellow-400" /> {workout.rating}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:ml-auto">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="btn btn-xs btn-outline border-base-300"
                >
                  View Details
                </Link>

                <button
                  onClick={() => {
                    removeFromSaved(workout.id);
                    toast.info(`Removed "${workout.name}" from saved`);
                  }}
                  className="text-base-content/40 hover:text-base-content"
                  aria-label="Remove"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
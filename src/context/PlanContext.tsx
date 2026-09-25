"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IFitlog } from "@/Types/types";

interface PlanItem {
  workout: IFitlog;
  done: boolean;
}

interface PlanContextType {
  planItems: PlanItem[];
  savedItems: IFitlog[];
  addToPlan: (workout: IFitlog) => void;
  saveForLater: (workout: IFitlog) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [savedItems, setSavedItems] = useState<IFitlog[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only available client-side; this must run after mount to avoid SSR hydration mismatches
      if (storedPlan) setPlanItems(JSON.parse(storedPlan));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedSaved) setSavedItems(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load plan from storage", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(planItems));
  }, [planItems, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems));
  }, [savedItems, hydrated]);

  const addToPlan = (workout: IFitlog) => {
    setPlanItems((prev) =>
      prev.some((item) => item.workout.id === workout.id)
        ? prev
        : [...prev, { workout, done: false }]
    );
  };

  const saveForLater = (workout: IFitlog) => {
    setSavedItems((prev) =>
      prev.some((w) => w.id === workout.id) ? prev : [...prev, workout]
    );
  };

  const removeFromPlan = (id: number) => {
    setPlanItems((prev) => prev.filter((item) => item.workout.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSavedItems((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleDone = (id: number) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.workout.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
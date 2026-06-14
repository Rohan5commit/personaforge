"use client";

export function getRunFromStorage(id: string) {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`personaforge_run_${id}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

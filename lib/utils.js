import { clsx } from "clsx"; 

import { twMerge } from "tailwind-merge"; 

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" }; 
  return new Date(date).toLocaleDateString("en-US", options); 
}

export function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}
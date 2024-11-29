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

export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error("No file provided for upload");
  }
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing");
  }
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Cloudinary upload failed: ${errorDetails.error?.message || "Unknown error"}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Image upload failed:", error?.message);
    throw error;
  }
}
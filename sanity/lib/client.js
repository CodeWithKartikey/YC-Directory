/**
 * Create a Sanity client instance for interacting with the Sanity API.
 * Learn more about Sanity clients at https://www.sanity.io/docs/js-client.
 */

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Export the configured Sanity client.
export const client = createClient({
  projectId, // Project ID for the Sanity project.
  dataset,   // Dataset name for the Sanity project.
  apiVersion, // API version to ensure compatibility.
  useCdn: true, // Set to false for static generation, ISR, or tag-based revalidation.
});
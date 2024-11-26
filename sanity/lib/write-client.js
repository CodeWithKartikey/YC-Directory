/**
 * Create a Sanity client instance for interacting with the Sanity API.
 * Learn more about Sanity clients at https://www.sanity.io/docs/js-client.
 */

import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "@/sanity/env";

// Export the configured Sanity client.
export const writeClient = createClient({
  projectId, // Project ID for the Sanity project.
  dataset,   // Dataset name for the Sanity project.
  apiVersion, // API version to ensure compatibility.
  token,    // API token for authenticated requests.
  useCdn: false, // Set to false for static generation, ISR, or tag-based revalidation.
});

if(!writeClient.config().token) {
    throw new Error("Token is required.");
}
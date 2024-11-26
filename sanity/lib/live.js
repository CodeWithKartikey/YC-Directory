/**
 * Set up live content fetching with the "sanityFetch" and "SanityLive" utilities.
 * Ensure the "<SanityLive />" component is rendered in your layout to keep content automatically updated.
 * For more details, visit: https://github.com/sanity-io/next-sanity#live-content-api.
 */

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

// Define live content fetching utilities and configure the client.
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Set the API version for the live content feature (currently available only on the experimental API).
    // Learn about API versioning at https://www.sanity.io/docs/api-versioning.
    apiVersion: "vX", // Replace with the appropriate API version.
  }),
});
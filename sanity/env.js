/**
 * Define the Sanity project configuration variables.
 * These values are retrieved from environment variables, with fallbacks where necessary.
 */

// Default to '2024-11-21' if no API version is provided.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-11-21"; 

// Dataset name for the Sanity project.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; 

// Project ID for the Sanity project.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; 

//  Sanity Token for the project.
export const token = process.env.SANITY_WRITE_TOKEN;
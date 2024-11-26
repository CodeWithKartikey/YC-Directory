/**
 * Create an image URL builder for Sanity to generate image URLs from Sanity assets.
 * Learn more about the image URL builder at https://www.sanity.io/docs/image-url.
 */

import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

// Initialize the image URL builder with the project ID and dataset.
const builder = createImageUrlBuilder({ projectId, dataset });

// Function to generate a URL for the given image source.
export const urlFor = (source) => {
  return builder.image(source); // Return the image URL.
};
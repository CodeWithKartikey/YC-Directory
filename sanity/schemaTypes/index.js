/**
 * Define the schema for your Sanity content types.
 * Add your custom content types to the `types` array.
 */

import { author } from "@/sanity/schemaTypes/author";
import { startup } from "@/sanity/schemaTypes/startup";
import { playlist } from "@/sanity/schemaTypes/playlist";

export const schema = {
  types: [author, startup, playlist], // Array to define custom content types.
};
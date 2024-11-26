'use client';

/**
 * Configuration for the Sanity Studio mounted at `/app/studio/[[...tool]]/page.jsx`.
 * Customize the Studio with schema definitions, plugins, and structure tools.
 */

import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';

// Import environment variables and schema definitions.
import { schema } from '@/sanity/schemaTypes';
import { structure } from '@/sanity/structure';
import { markdownSchema } from 'sanity-plugin-markdown';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export default defineConfig({
  basePath: "/studio", // Base path for the Studio.
  projectId, // Project ID from environment configuration.
  dataset, // Dataset name from environment configuration.
  
  // Define the content schema located in the './sanity/schemaTypes' folder.
  schema,

  // Add Studio plugins to extend functionality.
  plugins: [
    // Structure tool for custom navigation and organization.
    structureTool({ structure }),
    // Vision tool for querying with GROQ directly from the Studio.
    visionTool({ defaultApiVersion: apiVersion }),
    // Markdown schema plugin for editing Markdown content.
    markdownSchema()
  ],
});
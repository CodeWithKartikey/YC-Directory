/**
 * Configuration file for running `$ sanity [command]` in this folder.
 * Learn more at https://www.sanity.io/docs/cli.
 */

import { defineCliConfig } from 'sanity/cli';

// Retrieve project-specific settings from environment variables.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; 
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; 

// Export the CLI configuration.
export default defineCliConfig({
  api: {
    projectId, 
    dataset, 
  },
});
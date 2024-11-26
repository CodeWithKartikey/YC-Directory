/** 
 * @type {import('postcss-load-config').Config} 
 * This is the PostCSS configuration file, which is used to load and configure PostCSS plugins.
 */

const config = {
  // Specify the plugins to be used by PostCSS.
  plugins: {
    // Tailwind CSS plugin: This allows PostCSS to process Tailwind CSS directives (e.g., @tailwind, @apply) and generate the corresponding styles.
    tailwindcss: {},
  },
};

export default config;
/**
 * @type {import('tailwindcss').Config}
 * Tailwind CSS configuration file specifying content paths, theme customizations, and plugins.
 */

module.exports = {
	// Specify paths to all of your template files. Tailwind will scan these files for class usage to generate the corresponding styles.
	darkMode: ["class"], 
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}", 
	  "./app/**/*.{js,ts,jsx,tsx,mdx}", 
	  "./sanity/**/*.{js,ts,jsx,tsx,mdx}", 
	],

	// Theme customization.
	theme: {
	  extend: {
		// Define custom screen sizes.
		screens: {
		  xs: "475px",
		},
  
		// Extend the color palette.
		colors: {
		  primary: {
			"100": "#FFE8F0", 
			DEFAULT: "#EE2B69", 
		  },
		  secondary: "#FBE843", 
		  black: {
			"100": "#333333", 
			"200": "#141413", 
			"300": "#7D8087", 
			DEFAULT: "#000000", 
		  },
		  white: {
			"100": "#F7F7F7",
			DEFAULT: "#FFFFFF", 
		  },
		},

		// Add custom font families.
		fontFamily: {
		  "work-sans": ["var(--font-work-sans)"], 
		},

		// Define custom border radii.
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)", 
		  sm: "calc(var(--radius) - 4px)",
		},

		// Add custom box shadow styles.
		boxShadow: {
		  100: "2px 2px 0px 0px rgb(0, 0, 0)", 
		  200: "2px 2px 0px 2px rgb(0, 0, 0)", 
		  300: "2px 2px 0px 2px rgb(238, 43, 105)", 
		},
	  },
	},

	// Include additional Tailwind CSS plugins.
	plugins: [
	  require("tailwindcss-animate"), 
	  require("@tailwindcss/typography"), 
	],
};
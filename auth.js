/**
 * NextAuth configuration for authentication using GitHub as a provider.
 * Learn more about NextAuth at https://next-auth.js.org/.
 */

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_QUERY_BY_GITHUB_ID } from "@/sanity/lib/queries";

// Export NextAuth handlers and utilities for authentication.
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Configure authentication providers.
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID, // GitHub OAuth client ID from environment variables.
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // GitHub OAuth client secret from environment variables.
    }),
  ],
  // Callbacks for authentication
  callbacks: {
    async signIn({ user, profile}) {
      try {
        if (!user || !profile) {
          console.error("Invalid user or profile data");
          return false;
        }

        // Check if user already exists
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_QUERY_BY_GITHUB_ID, { id: profile?.id });

        if (existingUser) {
          console.log(`User with ${profile?.id} already exists.`);
          return true;
        }

        // Create a new user if not found
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name: user?.name || profile?.login || "Unknown User",
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });

        console.log(`Created new user with ID: ${profile?.id}`);
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      try {
        if (account && profile) {
          // Fetch the user from Sanity
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_QUERY_BY_GITHUB_ID, { id: profile?.id });

          // If user exists, add user ID to token
          if (user) {
            token.id = user?._id;
            token.name = user?.name;
            token.image = user?.image;
          } else {
            // Fallback for missing user
            console.warn(`User with ID ${profile?.id} not found.`);
            token.id = profile?.id || "Unknown Id";
            token.name = profile?.name || "Unknown User";
            token.image = profile?.image || "Unknown Image";
          }
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        image: token.image,
      };
      return session;
    }
  }
});
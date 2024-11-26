import { client } from "@/sanity/lib/client";

import SearchForm from "@/components/SearchForm";
import StartUpCard from "@/components/StartUpCard";

import { STARTUP_QUERY } from "@/sanity/lib/queries";
export default async function Home({ searchParams }) {

  const query = (await searchParams).query;
  const params = { search: query || null };

  const posts = await client.fetch(STARTUP_QUERY, params);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        
        <SearchForm query={query}  />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          { query ? `Search results for "${query}"` : "All Startups" }
        </p>

        <ul className="mt-7 card_grid">
          { posts?.length > 0 
            ? 
            (
              posts.map((post) => (
                <StartUpCard key={post?._id} post={post} />
              ))
            ) 
            : 
            (
              <p className="no-results">No startups found.</p>
            )
          }
          
        </ul>
      </section>
    </>
  );
};

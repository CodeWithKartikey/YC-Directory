import React from 'react';

import StartUpCard from '@/components/StartUpCard';

import { client } from '@/sanity/lib/client';
import { STARTUP_BY_AUTHOR } from '@/sanity/lib/queries';

const UserStartUp = async ({ id }) => {

  const startups = await client.fetch(STARTUP_BY_AUTHOR, { id });
  return (
    <>
      {
        startups.length > 0 
        ? 
        (
          startups.map((startup) => (
            <StartUpCard key={startup?._id} post={startup} />
          ))
        ) : 
        (
          <p className="no-result">No startups found.</p>
        )
      }
    </>
  );
};

export default UserStartUp;
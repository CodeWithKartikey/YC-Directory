import React from 'react';

import { unstable_after as after } from 'next/server';

import { client } from '@/sanity/lib/client';
import { STARTUP_VIEW } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

const View = async ({ slug }) => {

  const post = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEW, { slug });

  after(async () => await writeClient.patch(post?._id).set({ views: (post?.views || 0) + 1 }).commit());

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <div className="relative">
          <div className="absolute -left-4 -top-0">
            <span className="flex size-[11px]">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-primary"></span>
              <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
            </span>
          </div>
        </div>
      </div>
      <p className="view-text">
        <span className="font-bold">
          {post?.views > 1 ? `${post?.views || 0} Views` : `${post?.views || 0} View`}
        </span>
      </p>
    </div>
  );
};

export default View;
import React, { Suspense } from 'react';
import Image from 'next/image';

import { auth } from '@/auth';

import UserStartUp from '@/components/UserStartUp';

import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY_BY_ID } from '@/sanity/lib/queries';

export const experimental_ppr = true;

const page = async ({ params }) => {

  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_QUERY_BY_ID, { id });
  if(!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black text-center uppercase line-clamp-2">
              {user?.name}
            </h3>
          </div>
          <Image 
            src={user?.image}
            alt={user?.name}
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-30-extrabold text-center mt-7">@{user?.username}</p>
          <p className="text-14-normal text-center mt-1">{user?.bio}</p>
        </div>
        <div className="gap-5 flex-1 flex flex-col lg:-mt-5">
          <p className="text-30-bold">{session?.user?.id === id ? "Your" : "All"} Startups</p>
          <ul className="card_grid-sm">
            <Suspense fallback={<p className="text-14-normal text-center text-black">Loading the startups ...</p>}>
              <UserStartUp id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
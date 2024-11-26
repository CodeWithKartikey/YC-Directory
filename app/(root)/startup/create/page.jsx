import React from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import StartUpForm from '@/components/StartUpForm';

const page = async () => {

  const session = await auth();
  if(!session) redirect('/login'); 

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartUpForm />
    </>
  );
};

export default page;
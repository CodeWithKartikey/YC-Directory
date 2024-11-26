import React  from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import SignIn from '@/components/SignIn';

const page = async () => {

  const session = await auth();
  if (session) {
    redirect("/");
    return null;
  }

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <SignIn />
      </div>
    </>
  );
};

export default page;
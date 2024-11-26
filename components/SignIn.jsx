import React from 'react';

import { signIn } from '@/auth';

const SignIn = () => {
  return (
    <form action={
      async() => 
        {
          'use server';
          await signIn("github", { redirectTo: "/" });
        }
      }>
      <button 
        type="submit"
        className="gap-1 flex items-center cursor-pointer bg-primary px-6 py-3"
      >
        <span className="text-white">Login With Github</span>
      </button>
    </form>
  );
};

export default SignIn;
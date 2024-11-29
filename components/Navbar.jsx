import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { auth, signOut } from '@/auth';

import { BadgePlusIcon, LogInIcon, LogOutIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = async () => {

  const session= await auth();
  return (
    <header className="px-6 py-4 font-work-sans bg-gray-50 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="YC Directory Logo"
            width={144}
            height={30}
            priority
          />
        </Link>
        <div className="gap-6 flex items-center text-black">
          {
            session && session?.user 
            ? 
            (
              <>
                <Link 
                  href="/startup/create"
                  className="gap-1 flex flex-col items-center cursor-pointer sm:flex-row"
                >
                  <BadgePlusIcon className="w-6 h-6 text-primary" />
                  <span>Create</span>
                </Link>
                <form action={
                  async() => 
                  {
                    'use server';
                    await signOut({ redirectTo: "/" });
                  }
                }>
                  <button 
                    type="submit"
                    className="gap-1 flex flex-col items-center cursor-pointer sm:flex-row"
                  >
                    <LogOutIcon className="w-6 h-6 text-primary" />
                    <span>Logout</span>
                  </button>
                </form>
                <Link href={`/user/${session?.user?.id}`}>
                  <Avatar className="size-10 cursor-pointer">
                    <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) 
            : 
            (
              <Link href="/auth/sign-in" className="gap-1 flex flex-col items-center cursor-pointer sm:flex-row">
                <LogInIcon className="w-6 h-6 text-primary" />
                <span>Login</span>
              </Link>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
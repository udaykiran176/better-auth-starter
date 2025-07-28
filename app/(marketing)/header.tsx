
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserProfile } from "@/components/user-profile";

export const Header = () => {

  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-2 ">
        <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-1">
            <Link href="/">
            <Image src="/atribot.svg" height={50} width={120} alt="atribot" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
        
          <div className="flex items-center gap-4">
          <UserProfile />
          </div>
      
      </div>
        </div>
    </header>
  );
};
import { Button } from "@/components/ui/button";
import { ThemeToogle } from "@/src/theme/theme-toogle";
import React from "react";
import { LoginButton } from "./auth/login-button";
import { getAuthSession } from "@/lib/auth";
import { UserProfile } from "./auth/user-profile";
import Link from "next/link";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="border-b border-b-accent z-20 fixed top-0 bg-background w-full">
      <div className="  container flex items-center py-2 max-w-lg m-auto gap-1">
        <div className="mr-auto">
          <Link href="/">
            <h2 className="text-2xl font-bold">Githread</h2>
          </Link>
        </div>
        {session?.user ? <UserProfile /> : <LoginButton />}
        <ThemeToogle />
      </div>
    </header>
  );
};

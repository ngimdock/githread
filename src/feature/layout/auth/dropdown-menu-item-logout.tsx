"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={async () => {
        startTransition(() => signOut());
      }}
    >
      {isPending ? (
        <Loader className="h-4 w-4 mr-2" />
      ) : (
        <LogOut className="h-4 w-4 mr-2" />
      )}
      Logout
    </DropdownMenuItem>
  );
};

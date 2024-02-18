"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import React, { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Loader } from "@/components/ui/loader";

export const LoginButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={async () => {
        startTransition(() => signIn());
      }}
    >
      {isPending ? (
        <Loader className="h-4 w-4 mr-2" />
      ) : (
        <LogIn className="h-4 w-4 mr-2" />
      )}
      Login
    </Button>
  );
};

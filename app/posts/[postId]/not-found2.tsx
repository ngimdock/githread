import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PostNotFound() {
  return (
    <Alert className="my-4">
      <AlertCircleIcon />
      <AlertTitle>Not found</AlertTitle>
      <AlertDescription>The post is not found.</AlertDescription>
      <Link
        href="/"
        className={clsx(buttonVariants({ variant: "outline" }), "bg-red-600")}
      >
        home
      </Link>
    </Alert>
  );
}

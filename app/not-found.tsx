import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Alert className="my-4">
      <AlertCircleIcon />
      <AlertTitle>Not found</AlertTitle>
      <AlertDescription>Could not find requested resource</AlertDescription>
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        Return Home
      </Link>
    </Alert>
  );
}

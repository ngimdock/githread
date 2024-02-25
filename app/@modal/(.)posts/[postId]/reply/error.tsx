"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname?.includes("/reply")}
      onOpenChange={() => router.back()}
    >
      <DialogContent>
        <Alert className="my-4">
          <AlertTriangle />
          <AlertTitle>Not logged</AlertTitle>
          <AlertDescription>
            You must be logged in to reply this tweet
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React from "react";
import {
  WritePostForm,
  WritePostFormValues,
} from "@/app/write/write-post-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

type WriteModalProps = {
  user: User;
  createPost: (values: WritePostFormValues) => Promise<string>;
};

export const WriteModal = ({ user, createPost }: WriteModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog open={pathname === "/write"} onOpenChange={() => router.back()}>
      <DialogContent>
        <WritePostForm user={user} onSubmit={createPost} />
      </DialogContent>
    </Dialog>
  );
};

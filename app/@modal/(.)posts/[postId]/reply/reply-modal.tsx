"use client";

import React from "react";
import {
  WritePostForm,
  WritePostFormValues,
} from "@/app/write/write-post-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

type ReplyModalProps = {
  user: User;
  createReply: (values: WritePostFormValues) => Promise<string>;
};

export const ReplyModal = ({ user, createReply }: ReplyModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes("/reply")}
      onOpenChange={() => router.back()}
    >
      <DialogContent>
        <WritePostForm user={user} onSubmit={createReply} />
      </DialogContent>
    </Dialog>
  );
};

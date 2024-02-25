"use client";

import {
  EditProfileFormType,
  ProfileForm,
} from "@/app/profile/edit/profile-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserEditType } from "@/src/queries/user.query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type EditProfileModalProps = {
  user: UserEditType;
  editProfile: (values: EditProfileFormType) => Promise<string | void>;
};

export const EditProfileModal = async ({
  user,
  editProfile,
}: EditProfileModalProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname === "/profile/edit"}
      onOpenChange={() => router.back()}
    >
      <DialogContent>
        <ProfileForm user={user} onSubmit={editProfile} />
      </DialogContent>
    </Dialog>
  );
};

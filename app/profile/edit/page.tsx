import { findUserEdit } from "@/src/queries/user.query";
import React from "react";
import { ProfileForm } from "./profile-form";
import { editProfile } from "./edit-profile.action";

export default async function EditProfile() {
  const user = await findUserEdit();
  return (
    <div className="h-full container flex items-center">
      <div className=" bg-card border border-border rounded-md p-4 flex-1">
        <ProfileForm user={user} onSubmit={editProfile} />
      </div>
    </div>
  );
}

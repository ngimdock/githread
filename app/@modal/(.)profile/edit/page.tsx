import { findUserEdit } from "@/src/queries/user.query";
import React from "react";
import { EditProfileModal } from "./edit-profile-modal";
import { editProfile } from "@/app/profile/edit/edit-profile.action";

export default async function page() {
  const user = await findUserEdit();

  return <EditProfileModal user={user} editProfile={editProfile} />;
}

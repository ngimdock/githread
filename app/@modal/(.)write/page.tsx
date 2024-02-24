import { finduser } from "@/src/queries/user.query";
import React from "react";
import { WriteModal } from "./write-modal";
import { createPost } from "@/app/write/write-post.action";

export default async function Page() {
  const user = await finduser();

  return <WriteModal user={user} createPost={createPost} />;
}

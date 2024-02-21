import React from "react";
import { WritePostForm } from "./write-post-form";
import { finduser } from "@/src/queries/user.query";
import { createPost } from "./write-post.action";

export default async function Write() {
  const user = await finduser();
  return <WritePostForm user={user} onSubmit={createPost} />;
}

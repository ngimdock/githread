import React from "react";
import { WritePostForm } from "./write-post-form";
import { finduser } from "@/src/queries/user.query";

export default async function Write() {
  const user = await finduser();
  return (
    <WritePostForm
      user={user}
      onSubmit={async () => {
        "use server";
      }}
    />
  );
}

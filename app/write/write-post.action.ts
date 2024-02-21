"use server";
import { prisma } from "@/lib/prisma";

import { finduser } from "@/src/queries/user.query";
import { WritePostFormValues } from "./write-post-form";
import { revalidatePath } from "next/cache";

export const createPost = async (values: WritePostFormValues) => {
  const user = await finduser();

  const post = await prisma.post.create({
    data: {
      content: values.content,
      userId: user.id,
    },
  });

  revalidatePath("/posts");

  return post.id;
};

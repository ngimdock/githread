"use server";
import { WritePostFormValues } from "@/app/write/write-post-form";
import { prisma } from "@/lib/prisma";

import { finduser } from "@/src/queries/user.query";
import { revalidatePath } from "next/cache";

export const createReply = async (
  postId: string,
  values: WritePostFormValues
) => {
  const user = await finduser();

  const post = await prisma.post.create({
    data: {
      content: values.content,
      userId: user.id,
      parentId: postId,
    },
  });

  revalidatePath(`/posts/${postId}`);

  return post.id;
};

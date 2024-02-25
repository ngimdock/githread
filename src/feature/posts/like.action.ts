"use server";

import { getAuthRequiredSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const likePost = async (postId: string) => {
  const { user } = await getAuthRequiredSession();

  if (!user.id) throw new Error("Not session found");

  const userAlreadyLikedPost = await userLikedThePost(postId, user.id);

  if (userAlreadyLikedPost) await deleteLike(userAlreadyLikedPost.id);
  else await createLike(postId, user.id);

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
};

function userLikedThePost(postId: string, userId: string) {
  return prisma?.like.findFirst({
    where: {
      postId,
      userId,
    },
    select: {
      id: true,
    },
  });
}

function deleteLike(likeId: string) {
  return prisma?.like.delete({
    where: {
      id: likeId,
    },
  });
}

function createLike(postId: string, userId: string) {
  return prisma?.like.create({
    data: {
      postId,
      userId,
    },
  });
}

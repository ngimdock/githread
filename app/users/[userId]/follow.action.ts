"use server";

import { finduser } from "@/src/queries/user.query";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const followUser = async (userToFollowId: string) => {
  const user = await finduser();

  const isFollowing = await userIsFollowing(userToFollowId, user.id);

  if (isFollowing) await deleteFollow(isFollowing.id);
  else await createFollow(userToFollowId, user.id);

  return revalidatePath(`/users/${userToFollowId}`);
};

export const userIsFollowing = (
  userToFollowId: string,
  currentUserId: string
) => {
  return prisma?.follow.findFirst({
    where: {
      followedId: userToFollowId,
      followerId: currentUserId,
    },
    select: {
      id: true,
    },
  });
};

async function deleteFollow(id: string) {
  await prisma.follow.delete({
    where: {
      id,
    },
  });
}

async function createFollow(userToFollowId: string, currentUserId: string) {
  await prisma.follow.create({
    data: {
      followerId: currentUserId,
      followedId: userToFollowId,
    },
  });
}

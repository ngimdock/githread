import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PostParams, PostViewParams } from "./types";

export const findLatestHomePosts = (userId?: string) =>
  prisma.post.findMany({
    where: { parentId: null },
    take: 20,
    orderBy: { createdAt: "desc" },
    select: {
      ...postSelectQuery(userId),
    },
  });

export const findPostView = ({ postId, userId }: PostViewParams) => {
  return prisma.post.findUnique({
    where: { id: postId },
    select: {
      ...postSelectQuery(userId),
      replies: {
        select: postSelectQuery(userId),
      },
      parent: {
        select: postSelectQuery(userId),
      },
    },
  });
};

export const findpost = ({ postId, userId }: PostParams) => {
  return prisma.post.findUnique({
    where: { id: postId },
    select: {
      ...postSelectQuery(userId),
    },
  });
};

/**Refactor queries */
export const postSelectQuery = (userId?: string): Prisma.PostSelect => ({
  id: true,
  content: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
  likes: {
    where: {
      userId: userId ?? "error",
    },
    select: {
      userId: true,
    },
  },

  _count: {
    select: {
      likes: true,
      replies: true,
    },
  },
});

/** Query types */

export type PostHomeType = Awaited<
  ReturnType<typeof findLatestHomePosts>
>[number];

// export type PostHomeType = Prisma.PromiseReturnType<typeof findLatestHomePosts>[number]

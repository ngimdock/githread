import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const findLatestHomePosts = (userId?: string) =>
  prisma.post.findMany({
    where: { parentId: null },
    take: 20,
    orderBy: { createdAt: "desc" },
    select: {
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
    },
  });

export type PostHomeType = Awaited<
  ReturnType<typeof findLatestHomePosts>
>[number];

// export type PostHomeType = Prisma.PromiseReturnType<typeof findLatestHomePosts>[number]

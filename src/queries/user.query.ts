import { getAuthRequiredSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { postSelectQuery } from "./posts.query";

export const finduser = async () => {
  const { user } = await getAuthRequiredSession();

  const userDatabase = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  return userDatabase;
};

export const findUserProfile = async (userId: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        {
          id: userId,
        },
        {
          username: userId,
        },
      ],
    },
    select: {
      ...userBaseQuery,
      _count: {
        select: {
          followeds: true,
          likes: true,
        },
      },
      posts: {
        select: postSelectQuery(userId),
        take: 10,
        orderBy: { createdAt: "desc" },
      },
      followeds: {
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          follower: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
      },
    },
  });
};

export const findUserEdit = async () => {
  const session = await getAuthRequiredSession();

  return prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: {
      ...userBaseQuery,
    },
  });
};

const userBaseQuery = {
  id: true,
  name: true,
  username: true,
  image: true,
  bio: true,
  createdAt: true,
  link: true,
} satisfies Prisma.UserSelect;

export type UserProfileType = NonNullable<
  Awaited<ReturnType<typeof findUserProfile>>
>;

export type UserEditType = NonNullable<
  Awaited<ReturnType<typeof findUserEdit>>
>;

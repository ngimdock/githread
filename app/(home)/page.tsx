import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await prisma.post.findMany({
    where: { parentId: null },
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
          userId: session?.user.id ?? "error",
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

  console.log({ posts });

  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  );
}

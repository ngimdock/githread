import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Post } from "@/src/feature/posts/post";
import { findLatestHomePosts } from "@/src/queries/posts.query";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await findLatestHomePosts();

  return (
    <div className="divide-y divide-muted">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

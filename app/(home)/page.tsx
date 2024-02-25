import { getAuthSession } from "@/lib/auth";
import { Post } from "@/src/feature/posts/post";
import { findLatestHomePosts } from "@/src/queries/posts.query";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await findLatestHomePosts(session?.user.id);

  return (
    <div className="divide-y divide-muted">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

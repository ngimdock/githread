import { getAuthRequiredSession } from "@/lib/auth";
import { Post } from "@/src/feature/posts/post";
import { findPostView } from "@/src/queries/posts.query";
import clsx from "clsx";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default async function PostView({ params }: Props) {
  const { user } = await getAuthRequiredSession();
  const post = await findPostView({ postId: params.postId, userId: user.id });

  if (!post) return notFound();

  return (
    <div className=" divide-y divide-accent">
      {post.parent && <Post post={post.parent} key={post.parent.id} />}
      <div
        className={clsx({
          "mt-10": post.parent,
        })}
      >
        <Post post={post} key={post.id} />
        <div className="ml-10 divide-y divide-accent">
          {post.replies.map((reply) => (
            <Post post={reply} key={reply.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

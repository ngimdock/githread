import { PostHomeType } from "@/src/queries/posts.query";
import React from "react";
import { PostLayout } from "./post-layout";
import Link from "next/link";

type PostProps = {
  post: PostHomeType;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
    </PostLayout>
  );
};

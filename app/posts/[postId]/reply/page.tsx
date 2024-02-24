import { WritePostForm } from "@/app/write/write-post-form";
import { Post } from "@/src/feature/posts/post";
import { findpost } from "@/src/queries/posts.query";
import { finduser } from "@/src/queries/user.query";
import { notFound } from "next/navigation";
import React from "react";
import { createReply } from "./write-reply.action";

type PostReplyProps = {
  params: {
    postId: string;
  };
};

export default async function PostReply({
  params: { postId },
}: PostReplyProps) {
  const user = await finduser();

  const post = await findpost({ postId, userId: user.id });

  if (!post) return notFound();

  return (
    <div>
      <Post post={post} />
      <WritePostForm
        user={user}
        onSubmit={async (values) => {
          "use server";

          return createReply(post.id, values);
        }}
      />
    </div>
  );
}

import { PostHomeType } from "@/src/queries/posts.query";
import React from "react";
import { PostLayout } from "./post-layout";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { LikeButton } from "./like-button";

type PostProps = {
  post: PostHomeType;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>

      <div className="flex gap-2 items-center">
        <LikeButton postId={post.id} isLiked={post.likes.length > 0} />

        <Link
          href={`/posts/${post.id}/reply`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div className="text-xs">
        <Link className="text-muted-foreground" href={`/posts/${post.id}`}>
          {post._count.likes} likes
        </Link>
        <span className="text-xs">{" • "}</span>
        <Link className="text-muted-foreground" href={`/posts/${post.id}`}>
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
};

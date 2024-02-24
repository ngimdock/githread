import { PostHomeType } from "@/src/queries/posts.query";
import React from "react";
import { PostLayout } from "./post-layout";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

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
        <Button size="icon" variant="ghost">
          <Heart size={20} />
        </Button>

        <Link
          href={`/posts/${post.id}/reply`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div>
        <Link
          className="text-sm text-muted-foreground"
          href={`/posts/${post.id}`}
        >
          {post._count.likes} likes
        </Link>
        <span className="text-xs">{" • "}</span>
        <Link
          className="text-sm text-muted-foreground"
          href={`/posts/${post.id}`}
        >
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
};

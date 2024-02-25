"use client";

import clsx from "clsx";
import { Heart, Loader } from "lucide-react";
import React, { useTransition } from "react";
import { likePost } from "./like.action";

type LikeButtonProps = {
  postId: string;
  isLiked: boolean;
};

export const LikeButton = ({ postId, isLiked }: LikeButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={clsx("rounded-md hover:bg-accent flex gap-1 items-center", {
        "text-red-500": isLiked,
      })}
      onClick={() => startTransition(() => likePost(postId))}
    >
      {isPending ? <Loader size={20} /> : <Heart size={20} />}
    </button>
  );
};

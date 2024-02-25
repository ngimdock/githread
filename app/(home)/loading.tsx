import { PostSkeleton } from "@/src/feature/posts/post-skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className=" divide-y divide-accent">
      {Array.from({ length: 20 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}

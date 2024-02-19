import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostHomeType } from "@/src/queries/posts.query";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

type PostLayoutProps = PropsWithChildren<{
  user: PostHomeType["user"];
  postId?: string;
  createdAt?: Date;
  className?: string;
}>;

export const PostLayout = ({
  user,
  postId,
  createdAt,
  className,
  children,
}: PostLayoutProps) => {
  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username} />
        ) : null}
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

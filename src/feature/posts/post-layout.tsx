import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date";
import { PostHomeType } from "@/src/queries/posts.query";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
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

      <div className="w-full ml-4 flex flex-col gap-2">
        <Link href={`/users/${user.username ?? user.id}`}>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm text-card-foreground mr-auto">
              {user.username}
            </p>
            {createdAt ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}
            <button>
              <MoreHorizontal size={20} />
            </button>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};

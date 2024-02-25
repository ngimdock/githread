import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileType } from "@/src/queries/user.query";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

type ProfileProps = PropsWithChildren<{
  user: UserProfileType;
}>;

export const Profile = ({ user, children }: ProfileProps) => {
  return (
    <div className="mt-4 container">
      <div className="flex gap-2 items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p>{user.username}</p>
        </div>
        <Avatar size="lg">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.username} />
          ) : null}
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {user.bio ? user.bio : "No bio"}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <div className="flex -space-x-2">
          {user.followeds.map((follower) => (
            <FollowerAvatar follower={follower} key={follower.follower.id} />
          ))}
        </div>

        <p className="text-muted-foreground text-xs">{" • "}</p>
        <p className="text- text-muted-foreground text-xs">
          {user._count.followeds} followers
        </p>

        {user.link ? (
          <>
            <p className="text-muted-foreground">{" ‧ "}</p>
            <Link
              className="text-muted-foreground hover:underline text-sm"
              href={user.link}
            >
              {removeHttp(user.link)}
            </Link>
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
};

type FollowerAvatarProps = {
  follower: UserProfileType["followeds"][number];
};

function FollowerAvatar({ follower }: FollowerAvatarProps) {
  const { id, image, username } = follower.follower;
  return (
    <Avatar size="sm" key={id} className="border-2 border-background">
      {image && <AvatarImage src={image} alt={username} />}
      <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

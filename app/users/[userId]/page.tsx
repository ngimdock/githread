import { getAuthRequiredSession } from "@/lib/auth";
import { findUserProfile } from "@/src/queries/user.query";
import React from "react";
import { Profile } from "./profile";
import { notFound, redirect } from "next/navigation";
import { followUser, userIsFollowing } from "./follow.action";
import { Button } from "@/components/ui/button";
import { Post } from "@/src/feature/posts/post";

type UserPageProps = {
  params: {
    userId: string;
  };
};

export default async function UserPage({ params: { userId } }: UserPageProps) {
  const session = await getAuthRequiredSession();
  const user = await findUserProfile(userId);

  if (!user) return notFound();

  const currentUserIsFollowing = session.user.id
    ? await userIsFollowing(userId, session.user.id)
    : null;

  const userToFollowIsCurrentUser = user.id === session.user.id;

  if (userToFollowIsCurrentUser) redirect("/profile");

  console.log({ currentUserIsFollowing });

  return (
    <Profile user={user}>
      <form className="mt-4">
        <Button
          formAction={async () => {
            "use server";

            if (!session.user) return;

            await followUser(userId);
          }}
          variant="outline"
        >
          {!!currentUserIsFollowing ? "Unfollow" : "Follow"}
        </Button>
      </form>

      <div className="divide-y divide-accent mt-4 border-t border-accent">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </Profile>
  );
}

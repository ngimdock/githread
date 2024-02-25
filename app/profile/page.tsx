import { getAuthRequiredSession } from "@/lib/auth";
import { findUserProfile } from "@/src/queries/user.query";
import { notFound } from "next/navigation";
import React from "react";
import { Profile } from "../users/[userId]/profile";
import { Post } from "@/src/feature/posts/post";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await getAuthRequiredSession();

  if (!session.user.id) throw new Error("Not session found");

  const user = await findUserProfile(session.user.id);

  if (!user) return notFound();

  return (
    <Profile user={user}>
      <form className="mt-4">
        <Link
          href="/profile/edit"
          className={buttonVariants({ variant: "outline" })}
        >
          Edit profile
        </Link>
      </form>

      <div className="divide-y divide-accent mt-4 border-t border-accent">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </Profile>
  );
}

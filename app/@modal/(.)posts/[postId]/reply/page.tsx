import { finduser } from "@/src/queries/user.query";
import React from "react";
import { createReply } from "@/app/posts/[postId]/reply/write-reply.action";
import { ReplyModal } from "./reply-modal";

type Props = {
  params: {
    postId: string;
  };
};
export default async function Page({ params: { postId } }: Props) {
  const user = await finduser();

  console.log({ postId });

  return (
    <ReplyModal
      user={user}
      createReply={async (values) => {
        "use server";

        return createReply(postId, values);
      }}
    />
  );
}

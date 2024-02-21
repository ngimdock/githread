import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default function page({ params }: Props) {
  return (
    <div>
      <p>Post {params.postId}</p>
    </div>
  );
}

import React from "react";
import { PostCard } from "./PostCard";

type Props = {
  posts:
    | {
        title: string;
        id: string;
        image: string | null;
      }[]
    | undefined;
};

const PostsContainer = ({ posts }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
      {posts?.map((post) => (
        <PostCard title={post.title} id={post.id} key={post.id} />
      ))}
    </div>
  );
};

export default PostsContainer;

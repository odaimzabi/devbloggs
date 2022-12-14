import React from "react";
import { PostCard } from "./PostCard";

type Props = {
  posts:
    | {
        title: string;
        id: string;
        image: string | null;
        subtitle: string;
      }[]
    | undefined;
};

const PostsContainer = ({ posts }: Props) => {
  return (
    <div className="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
      {posts?.map((post) => (
        <div key={post.id}>
          <PostCard
            subtitle={post.subtitle}
            title={post.title}
            id={post.id}
            image={post.image as string}
          />
        </div>
      ))}
    </div>
  );
};

export default PostsContainer;

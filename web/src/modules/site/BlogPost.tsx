import React from "react";
import Image from "next/image";

type Props = {
  image: string;
  title: string;
  subtitle: string;
};

function BlogPost({ title, subtitle }: Props) {
  return (
    <div className="transform overflow-hidden rounded-lg shadow-lg transition duration-500 ease-in-out hover:shadow-2xl md:w-80">
      <Image
        alt="blog photo"
        width={400}
        height={220}
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
        className="max-h-40 w-full object-cover"
      />
      <div className="flex w-full flex-col gap-2 bg-white p-4">
        <a href="#" className="text-2xl font-medium text-gray-700">
          {title}
        </a>
        <p className="mb-2 mt-2 text-sm font-medium text-gray-800">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default BlogPost;

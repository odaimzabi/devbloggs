import React from "react";
import Link from "next/link";
import { ImageCard } from "./ImageCard";

export const PostCard = ({
  subtitle,
  title,
  id,
  image,
}: {
  subtitle: string;
  title: string;
  id: string;
  image: string;
}) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md ">
      <Link href={`dashboard/edit/${id}`}>
        <ImageCard src={image} />
      </Link>
      <div className="flex flex-col gap-3 p-5">
        <Link href={`dashboard/edit/${id}`}>
          <a
            className="text-2xl font-medium text-gray-700 hover:underline"
            data-testid="post-link"
          >
            {title}
          </a>
        </Link>
        <p className="text-md font-medium text-gray-700">{subtitle}</p>
      </div>
    </div>
  );
};

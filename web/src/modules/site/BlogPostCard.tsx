import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  image: string;
  title: string;
  subtitle: string;
  id: string;
};

function BlogPostCard({ title, subtitle, id, image }: Props) {
  const { query } = useRouter();
  return (
    <div className="md:w-90 transform overflow-hidden rounded-lg shadow-lg transition duration-500 ease-in-out hover:shadow-2xl">
      <Image
        alt="blog photo"
        width={420}
        height={220}
        src={image}
        className="max-h-40 w-full object-cover"
      />
      <div className="flex w-full flex-col gap-2 bg-white p-4">
        <Link href={`/s/${query.siteId}/p/${id}`}>
          <a className="text-2xl font-medium text-gray-700">{title}</a>
        </Link>
        <p className="mb-2 mt-2 text-sm font-medium text-gray-800">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default BlogPostCard;

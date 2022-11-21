import Image from "next/image";
import React from "react";
import student from "../../assets/student.jpeg";
import Link from "next/link";
export const PostCard = ({ title, id }: { title: string; id: string }) => {
  return (
    <div className="transform overflow-hidden rounded-lg shadow-lg transition duration-500 ease-in-out hover:shadow-2xl md:w-80">
      <Link href={`dashboard/edit/${id}`}>
        <Image
          width={400}
          height={180}
          className="cursor-pointer rounded-sm"
          src={student}
          alt="Post image"
        />
      </Link>
      <div className="flex w-full flex-col gap-2 bg-white p-4">
        <a href="#" className="text-2xl font-medium text-gray-700">
          {title}
        </a>

        <span className="mb-2 mt-2 w-12 rounded bg-gray-600 p-1 text-center text-base font-medium text-white">
          Draft
        </span>
      </div>
    </div>
  );
};

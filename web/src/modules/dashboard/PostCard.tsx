import Image from "next/image";
import React from "react";
import student from "../../assets/student.jpeg";
import Link from "next/link";
export const PostCard = ({ title, id }: { title: string; id: string }) => {
  return (
    <div className="mt-2 flex max-w-xs flex-col rounded-lg border border-gray-200 bg-white shadow-md">
      <Link href={`dashboard/edit/${id}`}>
        <Image
          width={400}
          height={180}
          className="cursor-pointer rounded-sm"
          src={student}
          alt="Post image"
        />
      </Link>

      <div className="p-3">
        <Link href={`dashboard/edit/${id}`}>
          <h2 className="mb-2  cursor-pointer text-lg font-bold tracking-tight text-black">
            {title}
          </h2>
        </Link>
      </div>
      <span className="mb-2 ml-2 w-12 rounded bg-gray-600 p-1 text-center text-base font-medium text-white">
        Draft
      </span>

      <div className=" mt-2 mb-2  border border-dashed border-t-gray-200" />
    </div>
  );
};

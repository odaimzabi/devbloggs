import Image from "next/image";
import React from "react";
import student from "../../assets/student.jpeg";
import Link from "next/link";

const CustomImage = React.forwardRef(() => (
  <Image
    width={400}
    height={170}
    className="cursor-pointer "
    src={student}
    alt="Post image"
  />
));

CustomImage.displayName = "Image";

export const PostCard = ({
  subtitle,
  title,
  id,
}: {
  subtitle: string;
  title: string;
  id: string;
}) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md ">
      <Link href={`dashboard/edit/${id}`}>
        <CustomImage />
      </Link>
      <div className="flex flex-col gap-3 p-5">
        <Link href={`dashboard/edit/${id}`}>
          <a className="text-2xl font-medium text-gray-700 hover:underline">
            {title}
          </a>
        </Link>
        <p className="text-md font-medium text-gray-700">{subtitle}</p>
      </div>
    </div>
  );
};

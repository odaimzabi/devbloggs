import Image from "next/image";
import React, { ReactHTML, ReactNode } from "react";
import student from "../../assets/student.jpeg";

export const PostCard = ({
  children,
  title,
  body,
  titleAs,
}: {
  children: ReactNode;
  title: string;
  body: ReactNode;
  titleAs?: keyof ReactHTML;
}) => {
  const TitleAs = titleAs ? titleAs : "div";

  return (
    <li className="flex max-w-sm cursor-default flex-col gap-4 overflow-hidden rounded bg-gray-50 shadow-lg dark:bg-gray-50 dark:text-black">
      <Image
        height={140}
        width={400}
        objectFit="cover"
        src={student}
        alt="a student"
      />
      <section className="px-6">
        <TitleAs className="mb-2 text-xl font-bold">{title}</TitleAs>
        <p className="text-base text-gray-700 dark:text-black">{body}</p>
      </section>
      <footer className="px-6 pt-4 pb-6">{children}</footer>
    </li>
  );
};

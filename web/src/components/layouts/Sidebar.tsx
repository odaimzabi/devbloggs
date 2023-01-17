import {
  IconClipboard,
  IconHome,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import classNames from "../../utils/classnames";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
const sidebarLinks = [
  {
    icon: <IconHome />,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <IconClipboard />,
    text: "Create Content",
    link: "/create-content",
  },
  {
    icon: <IconSettings />,
    text: "Site Preferences",
    link: "/site-preferences",
  },
];
const UserSkeleton = () => (
  <div className="mr-auto flex animate-pulse items-center">
    <svg
      className="h-12 w-12 text-gray-200 dark:text-gray-500"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div className="h-2 w-40 rounded-full bg-gray-200 "></div>
  </div>
);
function SideBar() {
  const { pathname } = useRouter();
  const { data: sessionData } = useSession();
  return (
    <aside className="sticky top-0 left-0 right-0 bottom-0 hidden h-screen w-1/5  flex-col bg-white shadow-md md:flex md:flex-col lg:flex lg:flex-col">
      <div className=" flex flex-row items-center gap-2 p-4 ">
        <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        <h2 className="  text-xl font-medium">DevBlog</h2>
      </div>
      <hr />
      <ul className="align-center mt-5  w-full flex-1 flex-col gap-2">
        {sidebarLinks.map(({ icon, text, link }) => (
          <Link href={`${link}`} key={text}>
            <li
              className={classNames(
                pathname.includes(link as string)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50",
                "align-center text-md mt-1 flex cursor-pointer flex-row items-center gap-2 px-4 py-4 font-semibold"
              )}
            >
              {icon}
              <span>{text}</span>
            </li>
          </Link>
        ))}
      </ul>

      <div className="text-md flex cursor-pointer  flex-row items-center gap-2 px-1 py-1 font-medium text-gray-700">
        {sessionData?.user ? (
          <>
            <Image
              src={sessionData.user.image as string}
              width={40}
              height={40}
              className="rounded-full"
              alt="User Avatar"
            />
            <span className="font-semibold text-gray-500">
              {sessionData.user.name}
            </span>
          </>
        ) : (
          <>
            <UserSkeleton />
          </>
        )}
      </div>

      <hr />
      <button
        className="text-md mt-auto mb-2 flex cursor-pointer  flex-row items-center gap-2 px-4 py-4 font-semibold text-gray-500 hover:bg-gray-50"
        onClick={() => signOut()}
      >
        <IconLogout />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default SideBar;

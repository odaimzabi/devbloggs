import React, { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { IconMenu2, IconX } from "@tabler/icons";
import classNames from "../../utils/classnames";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
const sidebarLinks = [
  {
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    text: "Create Content",
    link: "/create-content",
  },
  {
    text: "Site Preferences",
    link: "/site-preferences",
  },
];

function Navbar() {
  const { pathname } = useRouter();
  const { data: sessionData } = useSession();

  return (
    <Disclosure
      as="nav"
      className="bg-white drop-shadow-md sm:hidden md:hidden"
    >
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center lg:justify-between">
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400  hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IconX
                      className="block h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <IconMenu2
                      className="block h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <h1 className="ml-3 text-xl  font-medium lg:ml-2">Devblog</h1>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center gap-4 md:ml-6">
                  {/* Profile dropdown */}

                  <button className="w-30 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Logout
                  </button>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="flex flex-col space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {sidebarLinks.map((item, index) => (
                <Link href={`${item.link}`} key={index}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      pathname.includes(item.link as string)
                        ? "bg-indigo-600 text-white"
                        : "text-black",
                      "block cursor-pointer rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.link ? "page" : undefined}
                  >
                    {item.text}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            <hr />
            <div className="flex flex-col">
              <div className="text-md mt-1 flex  cursor-pointer flex-row items-center gap-2 px-2 py-2 font-medium text-gray-700">
                {sessionData?.user && (
                  <>
                    <Image
                      src={sessionData.user.image as string}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="User Avatar"
                    />
                    <span className="font-medium text-gray-500">
                      {sessionData.user.name}
                    </span>
                  </>
                )}
              </div>
              <button
                className="text-md  ml-1 mb-2 flex cursor-pointer  items-center gap-2 p-2 font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => signOut()}
              >
                <span>Logout</span>
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;

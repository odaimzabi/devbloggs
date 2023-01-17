import React, { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { IconHome, IconMenu2, IconX } from "@tabler/icons";
import classNames from "../../utils/classnames";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Link from "next/link";
import Image from "next/image";
const sidebarLinks = [
  {
    text: "Back to dashboard",
    link: "/dashboard",
  },
];

export type NavbarProps = {
  user: {
    image: string | null;
    name: string | null;
  } | null;
};

function SiteNavbar({ user }: NavbarProps) {
  const { pathname, query } = useRouter();

  return (
    <Disclosure as="nav" className="border border-b-black bg-white">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 md:py-3 lg:py-3 lg:px-8">
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
              <div className="flex flex-col ">
                <div className="text-md  ml-3 flex cursor-pointer flex-row  items-center gap-2 px-2 py-2 font-medium text-gray-700 md:m-0 lg:m-0">
                  {user?.image && (
                    <>
                      <Link href={`/s/${query.siteId}`} passHref>
                        <a className="flex flex-row items-center gap-2">
                          <Image
                            src={user?.image as string}
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt="User Avatar"
                          />
                          <span className="font-medium text-gray-800">
                            {user?.name}
                          </span>
                        </a>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden items-center gap-8  md:flex md:flex-row lg:flex lg:flex-row ">
                <Link href="/dashboard" passHref>
                  <a className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-black p-2">
                    <IconHome className="cursor-pointer" />

                    <span className="font-medium text-gray-800">Dashboard</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="flex flex-col space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {sidebarLinks.map((item) => (
                <NextLink href={`${item.link}`} key={item.link}>
                  <Disclosure.Button
                    key={item.text}
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
                </NextLink>
              ))}
            </div>
            <hr />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default SiteNavbar;

import React, { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { IconDeviceTv, IconHome, IconMenu2, IconX } from "@tabler/icons";
import classNames from "../../utils/classnames";

const sidebarLinks = [
  {
    icon: <IconHome />,
    text: "Dashboard",
    link: "/",
  },
  {
    icon: <IconDeviceTv />,
    text: "My Content",
  },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function Navbar() {
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
              <h1 className="ml-3 text-2xl  font-medium lg:ml-2">DevBlog</h1>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center gap-4 md:ml-6">
                  {/* Profile dropdown */}

                  <button className="w-30 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Logout
                  </button>
                  <div>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {sidebarLinks.map((item) => (
                <Disclosure.Button
                  key={item.text}
                  as="a"
                  href={item.link}
                  className={classNames(
                    item.link ? "bg-indigo-600 text-white" : "text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.link ? "page" : undefined}
                >
                  {item.text}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;

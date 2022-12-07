import React, { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

function LPNavbar() {
  const session = useSession();
  return (
    <Disclosure as="nav" className="bg-white drop-shadow ">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2">
            <div className="flex h-16 items-center justify-between">
              <div className=" flex flex-row items-center gap-2 p-4 ">
                <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
                <h2 className="  text-xl font-medium">DevBlog</h2>
              </div>

              <div className=" md:block">
                <div className=" flex items-center gap-4 ">
                  {/* Profile dropdown */}

                  {session.data?.user ? (
                    <Link href={"/dashboard"}>
                      <button className="w-30 rounded-md  border border-indigo-600 py-2 px-4 text-base font-medium text-indigo-600  focus:outline-none">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <button className="w-30 rounded-md  border border-indigo-600 py-2 px-4 text-base font-medium text-indigo-600  focus:outline-none">
                      Sign up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default LPNavbar;

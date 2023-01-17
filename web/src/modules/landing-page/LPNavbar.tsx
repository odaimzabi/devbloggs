import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

function LPNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="px-6 pt-6 lg:px-8">
      <div>
        <nav
          className="flex h-9 items-center justify-between"
          aria-label="Global"
        >
          <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
            </a>
          </div>

          <div className="lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <Link href={"/auth/login"} passHref>
              <a className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Log in
              </a>
            </Link>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex h-9 items-center justify-between">
              <div className="flex">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
                </a>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link href={"/auth/login"} passHref>
                    <a className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      Log in
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
}

export default LPNavbar;

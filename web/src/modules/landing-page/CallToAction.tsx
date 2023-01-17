import Link from "next/link";
import React from "react";

function CallToAction() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">
            Create an account to explore our features.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href={"/login"} passHref>
              <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700">
                Get started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;

import React from "react";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import Layout from "../../components/layouts/Layout";
import Image from "next/image";

import student from "../../assets/student.jpeg";
export default function DashboardScreen() {
  return (
    <Layout>
      <Container>
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <div className=" align-items mt-4 mb-4 flex flex-col gap-4 -space-y-px md:flex-row xl:flex-row ">
          <input
            name="email"
            type="email"
            className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base lg:w-96"
            placeholder="Type something.."
          />
          <Button text="Search Posts" type="submit" />
        </div>

        <div className="mt-2 max-w-sm rounded-lg border border-gray-200 bg-white shadow-md md:max-w-full lg:w-1/4">
          <a href="#">
            <Image
              width={400}
              height={200}
              className="rounded-sm"
              src={student}
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-black ">
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

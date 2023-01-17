import React, { ReactElement } from "react";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

type Props = {
  children: ReactElement;
};

function Layout({ children }: Props) {
  return (
    <div className="h-full bg-gray-50 md:min-h-full lg:min-h-full">
      <Navbar />
      <div className="flex  max-w-full flex-row justify-start">
        <SideBar />
        {children}
      </div>
    </div>
  );
}

export default Layout;

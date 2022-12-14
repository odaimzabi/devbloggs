import React from "react";
import Image from "next/image";
import { NavbarProps } from "./SiteNavbar";
export const UserImage = React.forwardRef(({ user }: NavbarProps, _ref) => (
  <a className="flex flex-row items-center gap-2">
    <Image
      src={user?.image as string}
      width={40}
      height={40}
      className="rounded-full"
      alt="User Avatar"
    />
    <span className="font-medium text-gray-800">{user?.name}</span>
  </a>
));

UserImage.displayName = "UserImage";

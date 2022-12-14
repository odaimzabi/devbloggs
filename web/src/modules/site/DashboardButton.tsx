import React from "react";
import { IconHome } from "@tabler/icons";
export const DashboardButton = React.forwardRef((_, _ref) => (
  <a className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-black p-2">
    <IconHome className="cursor-pointer" />

    <span className="font-medium text-gray-800">Dashboard</span>
  </a>
));

DashboardButton.displayName = "DashboardButton";

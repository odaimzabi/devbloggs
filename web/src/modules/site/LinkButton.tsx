import React from "react";
export const LinkButton = ({
  link,
  icon,
  text,
}: {
  icon: React.ReactElement;
  link: string;
  text: string;
}) => (
  <a
    className="w-34  flex flex-row items-center gap-4 rounded-md border border-gray-600 p-2"
    href={link}
    target="_blank"
    rel="noreferrer"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </a>
);

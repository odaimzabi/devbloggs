import React, { ReactElement } from "react";

type Props = {
  children: ReactElement[];
};

function Container({ children }: Props) {
  return (
    <div className="align-center flex w-full flex-col gap-2 py-20 px-10">
      {children}
    </div>
  );
}

export default Container;

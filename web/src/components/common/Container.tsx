import Head from "next/head";
import React, { ReactElement } from "react";

type Props = {
  children: ReactElement[] | ReactElement;
  title: string;
};

function Container({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{`${title} | Devblog`}</title>
      </Head>

      <div className="align-center flex w-full flex-col gap-2 py-20 px-10">
        <h2 className="text-2xl font-bold">{title}</h2>

        {children}
      </div>
    </>
  );
}

export default Container;

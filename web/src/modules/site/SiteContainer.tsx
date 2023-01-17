import { IconBrandFacebook, IconBrandLinkedin } from "@tabler/icons";
import Head from "next/head";
import React, { ReactElement } from "react";
import { LinkButton } from "./LinkButton";

type Props = {
  children: ReactElement[] | ReactElement;
  description: string;
  name: string;
  facebook: string;
  linkedin: string;
};

function SiteContainer({
  children,
  description,
  name,
  facebook,
  linkedin,
}: Props) {
  return (
    <>
      <Head>
        <title>{`${name} | Devblog`}</title>
      </Head>

      <div className="align-center flex h-screen w-full flex-col gap-2 ">
        <div className=" border border-b-black p-10 ">
          <div className=" flex flex-col items-start gap-5  md:p-20  lg:p-20">
            <p className="   text-2xl font-medium md:text-3xl lg:text-3xl">
              {description}
            </p>
            <div className="flex flex-row items-start gap-4 ">
              {facebook && (
                <LinkButton
                  icon={<IconBrandFacebook />}
                  link={facebook}
                  text="Facebook"
                />
              )}
              {linkedin && (
                <LinkButton
                  icon={<IconBrandLinkedin />}
                  link={linkedin}
                  text="Linkedin"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-10 py-10">{children}</div>
      </div>
    </>
  );
}

export default SiteContainer;

import { IconBrandGithub } from "@tabler/icons";
import Head from "next/head";
import React from "react";
import { BlogPostDetails } from "../../types";
import { LinkButton } from "./LinkButton";
import SiteNavbar from "./SiteNavbar";

type Props = {
  data: BlogPostDetails;
};

function BlogPostScreen({ data }: Props) {
  return (
    <>
      <Head>
        <title>{`${data.post.title} | ${data.site.user?.name}`}</title>
      </Head>

      <div className="site-post h-screen">
        <SiteNavbar user={data?.site?.user} />

        <div className="mt-3 flex items-center justify-center">
          <div className="flex max-w-xs flex-col items-center gap-8 rounded-md border border-black bg-white p-3 sm:max-w-sm md:max-w-2xl lg:max-w-2xl">
            <video
              src={data.post.video as string}
              poster={data.post.image as string}
              muted
              controls
            />
            <div className="flex w-full flex-col gap-1">
              <div className="mt-2 mb-3">
                <h1 className="text-3xl font-medium">{data.post.title}</h1>
                <h2 className="text-lg font-normal italic text-gray-600">
                  {data.post.subtitle}
                </h2>
              </div>
              <hr />
              <div className="mt-2 mb-3">
                <h1 className="text-lg font-medium">Description:</h1>
                <p className="break-words">{data.post.description}</p>
              </div>
              {data.post.github_repo ? (
                <>
                  <hr />
                  <div className="mt-2 mb-3 flex flex-col items-start gap-2">
                    <h1 className="text-lg font-medium">Github repo:</h1>
                    <LinkButton
                      icon={<IconBrandGithub />}
                      text="Github"
                      link=""
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPostScreen;

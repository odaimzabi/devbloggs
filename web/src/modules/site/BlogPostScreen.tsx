import React from "react";
import { BlogPostDetails } from "../../types";
import SiteNavbar from "./SiteNavbar";

type Props = {
  data: BlogPostDetails;
};

function BlogPostScreen({ data }: Props) {
  console.log(data.site);
  return (
    <div className="site-post">
      <SiteNavbar user={data?.site?.user} />

      <div className="flex h-screen items-center justify-center  gap-6">
        <div className="flex  max-w-xs flex-col items-center gap-8 rounded-md border border-black bg-white p-3 sm:max-w-sm md:max-w-2xl lg:max-w-2xl">
          <video
            src={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
            muted
            controls
          />
          <div className="flex w-full flex-col gap-1 ">
            <h1 className="text-3xl font-medium">{data.post.title}</h1>
            <h2 className="text-lg font-normal italic text-gray-600">
              {data.post.subtitle}
            </h2>
            <hr />
            <div className="mt-2 mb-3">
              <h1 className="text-lg font-medium">Description:</h1>
              <p className="break-words">{data.post.description}</p>
            </div>
            <hr />
            <div className="mt-2 mb-3">
              <h1 className="text-lg font-medium">Github repo:</h1>
              <p className="break-words">{data.post.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostScreen;

import React from "react";
import SiteContainer from "./SiteContainer";
import SiteNavbar from "./SiteNavbar";
import BlogPostCard from "./BlogPostCard";
import { SiteDetails } from "../../types";
type Props = {
  site: SiteDetails;
};

function SiteScreen({ site }: Props) {
  return (
    <>
      <SiteNavbar user={site.user} />
      <SiteContainer
        name={`${site.user?.name}`}
        description={site?.description as string}
        facebook={site.facebook as string}
        linkedin={site.linkedin as string}
      >
        <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-3 lg:grid-cols-3">
          {site?.user?.posts.map((post) => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              subtitle={post.subtitle}
              title={post.title}
              image={post.image as string}
            />
          ))}
        </div>
      </SiteContainer>
    </>
  );
}

export default SiteScreen;

import React from "react";
import SiteContainer from "./SiteContainer";
import SiteNavbar from "./SiteNavbar";
import { PostPrice } from "@prisma/client";
import BlogPost from "./BlogPost";
type Props = {
  site: {
    user: {
      image: string | null;
      name: string | null;
      posts: {
        price: PostPrice;
        image: string | null;
        subtitle: string;
        title: string;
        id: string;
      }[];
    } | null;
    description: string | null;
    domain: string;
    facebook: string | null;
    linkedin: string | null;
    price: string;
  };
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
        <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-3">
          {site?.user?.posts.map((post) => (
            <BlogPost
              key={post.id}
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

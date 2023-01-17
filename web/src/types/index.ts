import { Post, PostStatus } from "@prisma/client";

export type SiteDetails = {
  user: {
    image: string | null;
    name: string | null;
    posts: {
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

export type BlogPostDetails = {
  post: Post;
  site: {
    user: {
      image: string | null;
      name: string | null;
      posts: {
        title: string;
        image: string | null;
        subtitle: string;
        id: string;
      }[];
    } | null;
    description: string | null;
    facebook: string | null;
    linkedin: string | null;
    domain: string;
    price: string;
  };
};

export type SiteData = {
  user: {
    image: string | null;
    name: string | null;
    posts: {
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

export type DashboardData = {
  posts:
    | {
        id: string;
        title: string;
        subtitle: string;
        status: PostStatus;
        image: string | null;
      }[]
    | undefined;
};

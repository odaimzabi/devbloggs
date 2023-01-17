import { GetServerSideProps } from "next";
import React from "react";
import BlogPostScreen from "../../../../modules/site/BlogPostScreen";
import { BlogPostDetails } from "../../../../types";
import { apiClient } from "../../../../libs/axios";

type Props = {
  data: BlogPostDetails;
};

function BlogPostPage({ data }: Props) {
  return <BlogPostScreen data={data} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  try {
    const { data: data } = await apiClient.post(`api/site`, {
      siteId: query.siteId,
      id: query.id,
    });
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data: data,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default BlogPostPage;

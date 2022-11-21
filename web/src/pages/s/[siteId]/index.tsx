import { PostPrice } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import SiteScreen from "../../../modules/site/SiteScreen";

type SiteData = {
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

type Props = {
  site: SiteData;
};

const SitePage = ({ site }: Props) => {
  return <SiteScreen site={site} />;
};

export default SitePage;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const id = query.siteId;
  try {
    const { data: site } = await axios.get<SiteData>(
      `http://localhost:3000/api/site?siteId=${id}`
    );
    if (!site.domain) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        site: site,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

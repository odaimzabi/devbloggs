import { GetServerSideProps } from "next";
import React from "react";
import SiteScreen from "../../../modules/site/SiteScreen";
import { SiteData } from "../../../types";
import { apiClient } from "../../../libs/axios";

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
  const domain = query.siteId;
  try {
    const { data: site } = await apiClient.get<SiteData>(
      `/site?domain=${domain}`
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

import React from "react";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Layout from "../../components/layouts/Layout";
import { trpc } from "../../utils/trpc";
import EditSiteForm, { SitePreferencesDTO } from "./EditSiteForm";

export default function SitePreferencesScreen() {
  const editSite = trpc.site.updateSite.useMutation();
  const { data: site, refetch, isLoading } = trpc.site.getSite.useQuery();

  const onSubmit = (data: SitePreferencesDTO) => {
    editSite.mutate(
      { id: site?.id as string, ...data },
      {
        onSuccess: () => {
          toast.success("Successfully updated the post!");
          refetch();
        },
        onError: (error) => {
          toast.error(`${error.message}`);
        },
      }
    );
  };
  return (
    <Layout>
      <Container title="Site Settings">
        {isLoading ? (
          <div className="mt-10 flex animate-spin items-center justify-center">
            <LoadingSpinner className="h-12 w-14" />
          </div>
        ) : (
          <EditSiteForm
            isLoading={editSite.isLoading}
            onSubmit={onSubmit}
            site={site}
          />
        )}
      </Container>
    </Layout>
  );
}

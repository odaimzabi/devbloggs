import React from "react";
import Container from "../../components/common/Container";
import Layout from "../../components/layouts/Layout";

import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import EditPostForm, { EditPostDTO } from "./EditPostForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function EditPostScreen() {
  const editPost = trpc.posts.editPost.useMutation();
  const router = useRouter();
  const {
    data: post,
    isLoading,
    refetch,
  } = trpc.posts.getPost.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id }
  );

  const onSubmit = (data: EditPostDTO) => {
    editPost.mutate(
      { id: post!.id, ...data },
      {
        onSuccess: (data) => {
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
      <Container>
        <h2 className="text-3xl font-bold" data-testid="heading">
          Create Post
        </h2>
        {!isLoading ? (
          <EditPostForm
            onSubmit={onSubmit}
            isLoading={editPost.isLoading}
            post={post}
          />
        ) : (
          <div className="mt-10 flex animate-spin items-center justify-center">
            <LoadingSpinner className="h-12 w-14" />
          </div>
        )}
      </Container>
    </Layout>
  );
}

export default EditPostScreen;

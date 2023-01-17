import React from "react";
import Container from "../../components/common/Container";
import Layout from "../../components/layouts/Layout";

import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import EditPostForm, { EditPostDTO } from "./EditPostForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { PostStatus } from "@prisma/client";

function EditPostScreen() {
  const editPost = trpc.posts.editPost.useMutation();
  const publishPost = trpc.posts.publishPost.useMutation();

  const router = useRouter();
  const {
    data: post,
    isLoading,
    refetch,
  } = trpc.posts.getPost.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id }
  );

  const handlePublishPost = () => {
    publishPost.mutate(
      { id: post?.id as string },
      {
        onSuccess: () => {
          toast.success(
            post?.status == PostStatus.Published
              ? "Sucessfully unpublished post"
              : "Sucessfully published post"
          );
          refetch();
        },
        onError: () => {
          toast.success("Could not publish the post for some reason");
        },
      }
    );
  };
  const onSubmit = (data: EditPostDTO) => {
    editPost.mutate(
      { id: post?.id as string, ...data },
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
      <Container title="Edit Post">
        {!isLoading ? (
          <EditPostForm
            onSubmit={onSubmit}
            isUpdatingPost={editPost.isLoading}
            isPublishingPost={publishPost.isLoading}
            handlePublishPost={handlePublishPost}
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

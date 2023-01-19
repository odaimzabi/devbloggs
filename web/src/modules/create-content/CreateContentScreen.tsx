import React from "react";
import Container from "../../components/common/Container";
import Layout from "../../components/layouts/Layout";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import CreateContentForm, { CreatePostDTO } from "./CreateContentForm";

function CreateContentScreen() {
  const createPost = trpc.posts.createPost.useMutation();
  const router = useRouter();
  const onSubmit = (data: CreatePostDTO) => {
    createPost.mutate(
      { ...data },
      {
        onSuccess: (data) => {
          toast.success("Successfully created the post!");
          router.push(`/dashboard/edit/${data.id}`);
        },
        onError: (error) => {
          toast.error(`${error.message}`);
        },
      }
    );
  };

  return (
    <Layout>
      <Container title="Create Post">
        <CreateContentForm
          isCreatingPost={createPost.isLoading}
          onSubmit={onSubmit}
        />
      </Container>
    </Layout>
  );
}

export default CreateContentScreen;

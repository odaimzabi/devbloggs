import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import Input from "../../components/common/Input";
import Layout from "../../components/layouts/Layout";
import MediaUpload from "../../components/common/MediaUpload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { MediaAsset } from "../../hooks/useUpload";

const schema = z.object({
  title: z
    .string({ required_error: "Post title is required" })
    .min(10, { message: "Must be 10 or more characters long" }),
  subtitle: z
    .string({ required_error: "Post title is required" })
    .min(10, { message: "Must be 10 or more characters long" }),
  description: z
    .string({ required_error: "Post description is required" })
    .min(20, { message: "Must be 20 or more characters long" }),
  github_repo: z
    .string()
    .startsWith("https://github.com/")
    .optional()
    .or(z.literal("")),
  image: z.string().optional(),
  video: z.string().optional(),
});

export type CreatePostDTO = z.infer<typeof schema>;

function CreateContentScreen() {
  const createPost = trpc.posts.createPost.useMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreatePostDTO>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      video: "",
    },
  });
  const updateAssets = (type: MediaAsset, key: string) => {
    if (type == "image") {
      setValue("image", key);
    } else {
      setValue("video", key);
    }
  };
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
        <form
          className=" mt-4 flex w-full flex-col gap-10 md:flex-row lg:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-4">
            <label className="text-base font-medium text-gray-700">
              Post title
            </label>

            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" data-testid="post_title" {...field} />
              )}
            />
            {errors.title && (
              <div className="text-red-500" data-testid="error">
                {errors.title.message as string}
              </div>
            )}
            <label className="text-base font-medium text-gray-700">
              Post subtitle
            </label>

            <Controller
              name="subtitle"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" data-testid="post_subtitle" {...field} />
              )}
            />
            {errors.subtitle && (
              <div className="text-red-500" data-testid="error">
                {errors.subtitle.message as string}
              </div>
            )}
            {/* <Controller
              name="price"
              control={control}
              render={({ field }) => <SelectInput name="price" />}
            />

            {errors.price && (
              <div className="text-red-500" data-testid="error">
                {errors.price.message as string}
              </div>
            )} */}
            <label className="text-base font-medium text-gray-700">
              Post Description
            </label>
            <textarea
              {...register("description")}
              className="h-32 rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              data-testid="post_description"
            />
            {errors.description && (
              <div className="text-red-500" data-testid="error">
                {errors.description.message as string}
              </div>
            )}
            <label className="text-base font-medium text-gray-700">
              Github repo (optional)
            </label>

            <Controller
              name="github_repo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" {...field} data-testid="github_repo" />
              )}
            />
            {errors.github_repo && (
              <div className="text-red-500" data-testid="error">
                {errors.github_repo.message as string}
              </div>
            )}

            <Button
              type="submit"
              text="Create Post"
              className="mt-2 hidden md:block lg:block"
              data-testid="createPost_btn"
              disabled={createPost.isLoading}
              isLoading={createPost.isLoading}
            />
          </div>
          <div className=" m-0 flex w-full flex-col items-center gap-4 md:ml-10 md:w-1/2 lg:ml-10 lg:w-1/2">
            <MediaUpload type="image" updateAssets={updateAssets} />
            <MediaUpload type="video" updateAssets={updateAssets} />
          </div>
          <Button
            type="submit"
            text="Create Post"
            className="block md:hidden lg:hidden"
            data-testid="createPost_btn"
            disabled={createPost.isLoading}
            isLoading={createPost.isLoading}
          />
        </form>
      </Container>
    </Layout>
  );
}

export default CreateContentScreen;

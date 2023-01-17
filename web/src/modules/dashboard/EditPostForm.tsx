import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { MediaAsset } from "../../hooks/useUpload";
import MediaUpload from "../../components/common/MediaUpload";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Post, PostStatus } from "@prisma/client";

type Props = {
  onSubmit: (data: EditPostDTO) => void;
  isUpdatingPost: boolean;
  isPublishingPost: boolean;
  post: Post | null | undefined;
  handlePublishPost: () => void;
};

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

export type EditPostDTO = z.infer<typeof schema>;

function EditPostForm({
  handlePublishPost,
  onSubmit,
  isUpdatingPost,
  isPublishingPost,
  post,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditPostDTO>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: post?.image as string,
      video: post?.video as string,
    },
  });

  const updateAssets = (type: MediaAsset, key: string) => {
    if (type == "image") {
      setValue("image", key);
    } else {
      setValue("video", key);
    }
  };
  return (
    <>
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
            defaultValue={post?.title}
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
            defaultValue={post?.subtitle}
            render={({ field }) => (
              <Input type="text" data-testid="post_subtitle" {...field} />
            )}
          />
          {errors.subtitle && (
            <div className="text-red-500" data-testid="error">
              {errors.subtitle.message as string}
            </div>
          )}
          <label className="text-base font-medium text-gray-700">
            Post Description
          </label>
          <textarea
            {...register("description")}
            defaultValue={post?.description}
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
            defaultValue={post?.github_repo ? post?.github_repo : ""}
            render={({ field }) => (
              <Input type="text" {...field} data-testid="github_repo" />
            )}
          />
          {errors.github_repo && (
            <div className="text-red-500" data-testid="error">
              {errors.github_repo.message as string}
            </div>
          )}

          <div className="mt-2  hidden flex-row items-center gap-4 md:flex lg:flex">
            <Button
              type="submit"
              text="Edit Post"
              data-testid="createPost_btn"
              disabled={isUpdatingPost}
              isLoading={isUpdatingPost}
            />
            <Button
              type="button"
              text={
                post?.status == PostStatus.Published
                  ? "Unpublish Post"
                  : "Publish Post"
              }
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              data-testid="createPost_btn"
              disabled={isPublishingPost}
              isLoading={isPublishingPost}
              onClick={() => handlePublishPost()}
            />
          </div>
        </div>
        <div className=" m-0 flex w-full flex-col items-center gap-4 md:ml-10 md:w-1/2 lg:ml-10 lg:w-1/2">
          <MediaUpload
            type="image"
            updateAssets={updateAssets}
            isUploaded={!!post?.image}
          />
          <MediaUpload
            type="video"
            updateAssets={updateAssets}
            isUploaded={!!post?.video}
          />
        </div>
        <div className="flex w-full flex-col gap-4 md:hidden lg:hidden">
          <Button
            type="submit"
            text="Edit Post"
            className=""
            data-testid="createPost_btn"
            disabled={isPublishingPost}
            isLoading={isPublishingPost}
          />
          <Button
            type="button"
            text={
              post?.status == PostStatus.Published
                ? "Unpublish Post"
                : "Publish Post"
            }
            className="bg-green-600 hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            data-testid="createPost_btn"
            disabled={isUpdatingPost}
            isLoading={isUpdatingPost}
            onClick={() => handlePublishPost()}
          />
        </div>
      </form>
    </>
  );
}

export default EditPostForm;

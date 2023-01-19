import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import MediaUpload from "../../components/common/MediaUpload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
type Props = {
  onSubmit: (data: CreatePostDTO) => void;
  isCreatingPost: boolean;
};
export type CreatePostDTO = z.infer<typeof schema>;
function CreateContentForm({ onSubmit, isCreatingPost }: Props) {
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
  return (
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
            <Input
              type="text"
              dataTestid="post_title"
              {...field}
              ariaInvalid={errors.title?.message ? "true" : "false"}
              name="title"
            />
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
            <Input
              type="text"
              dataTestid="post_subtitle"
              ariaInvalid={errors.subtitle?.message ? "true" : "false"}
              {...field}
            />
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
          className="h-32 rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          data-testid="post_description"
          aria-invalid={errors.description?.message ? "true" : "false"}
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
            <Input
              type="text"
              {...field}
              dataTestid="github_repo"
              ariaInvalid={errors.github_repo?.message ? "true" : "false"}
            />
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
          disabled={isCreatingPost}
          isLoading={isCreatingPost}
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
        disabled={isCreatingPost}
        isLoading={isCreatingPost}
      />
    </form>
  );
}

export default CreateContentForm;

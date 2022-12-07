import { zodResolver } from "@hookform/resolvers/zod";
import { Site } from "@prisma/client";
import { IconEye } from "@tabler/icons";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

type Props = {
  onSubmit: (data: SitePreferencesDTO) => void;
  isLoading: boolean;
  site: Site | null | undefined;
};

const schema = z.object({
  domain: z
    .string({ required_error: "Domain site is required" })
    .transform((s) => s.toLowerCase()),
  description: z
    .string({ required_error: "Post description is required" })
    .min(10, { message: "Must be 10 or more characters long" }),
  linkedin: z
    .string()
    .startsWith("https://www.linkedin.com/in/")
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .startsWith("https://facebook.com/")
    .optional()
    .or(z.literal("")),
});

export type SitePreferencesDTO = z.infer<typeof schema>;

function EditSiteForm({ isLoading, onSubmit, site }: Props) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<SitePreferencesDTO>({
    resolver: zodResolver(schema),
  });
  return (
    <>
      <Button
        text="Live Preview"
        icon={<IconEye />}
        className="ring:bg-sky-600 mt-2 block w-full bg-sky-600 hover:bg-sky-700"
        onClick={() => router.push(`/s/${site?.domain}`)}
      />
      <form
        className=" mt-4 flex w-full flex-col gap-10 md:w-1/2 md:flex-row lg:w-1/2 lg:flex-row"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-4">
          <label className="text-base font-medium text-gray-700">
            Domain Site
          </label>

          <Controller
            name="domain"
            control={control}
            defaultValue={site?.domain ? site?.domain : ""}
            render={({ field }) => <Input type="text" {...field} />}
          />
          {errors.domain && (
            <div className="text-red-500" data-testid="error">
              {errors.domain.message as string}
            </div>
          )}
          <label className="text-base font-medium text-gray-700">
            Site description
          </label>

          <textarea
            {...register("description")}
            defaultValue={site?.description as string}
            className="h-32 rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.description && (
            <div className="text-red-500" data-testid="error">
              {errors.description.message as string}
            </div>
          )}

          <label className="text-base font-medium text-gray-700">
            Linkedin profile
          </label>

          <Controller
            name="linkedin"
            defaultValue={site?.linkedin ? site?.linkedin : ""}
            control={control}
            render={({ field }) => <Input type="text" {...field} />}
          />
          {errors.linkedin && (
            <div className="text-red-500" data-testid="error">
              {errors.linkedin?.message as string}
            </div>
          )}

          <label className="text-base font-medium text-gray-700">
            Facebook profile
          </label>

          <Controller
            name="facebook"
            defaultValue={site?.facebook ? site?.facebook : ""}
            control={control}
            render={({ field }) => <Input type="text" {...field} />}
          />
          {errors.facebook && (
            <div className="text-red-500" data-testid="error">
              {errors.facebook?.message as string}
            </div>
          )}
          <Button
            type="submit"
            text="Save changes"
            className="mt-2"
            data-testid="createPost_btn"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
}

export default EditSiteForm;

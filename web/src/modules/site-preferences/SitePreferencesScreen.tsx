import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye } from "@tabler/icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import Input from "../../components/common/Input";
import Layout from "../../components/layouts/Layout";

const schema = z.object({
  domain_site: z.string().transform((s) => s.toLowerCase()),
  description: z
    .string({ required_error: "Post description is required" })
    .min(20, { message: "Must be 20 or more characters long" }),
  subscription_price: z.number().min(5),
});

export type SitePreferencesDTO = z.infer<typeof schema>;

export default function SitePreferencesScreen() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<SitePreferencesDTO>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log("hello");
  };
  return (
    <Layout>
      <Container title="Site Settings">
        <Button
          text="Live Preview"
          icon={<IconEye />}
          className="ring:bg-sky-600 mt-2 block w-full bg-sky-600 hover:bg-sky-700"
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
              name="domain_site"
              control={control}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors.domain_site && (
              <div className="text-red-500" data-testid="error">
                {errors.domain_site.message as string}
              </div>
            )}
            <label className="text-base font-medium text-gray-700">
              Site description
            </label>

            <textarea
              {...register("description")}
              className="h-32 rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.description && (
              <div className="text-red-500" data-testid="error">
                {errors.description.message as string}
              </div>
            )}

            <label className="text-base font-medium text-gray-700">
              Subscription Price
            </label>

            <Controller
              name="subscription_price"
              control={control}
              render={({ field }) => <Input type="number" {...field} />}
            />
            {errors.subscription_price && (
              <div className="text-red-500" data-testid="error">
                {errors.subscription_price.message as string}
              </div>
            )}
            <Button
              type="submit"
              text="Save changes"
              className="mt-2"
              data-testid="createPost_btn"
            />
          </div>
        </form>
      </Container>
    </Layout>
  );
}

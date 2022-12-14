import LoadingSpinner from "../components/common/LoadingSpinner";
import { IconChecks, IconMovie, IconPolaroid } from "@tabler/icons";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../utils/trpc";

export type MediaAsset = "video" | "image";

export const useUpload = (
  type: MediaAsset,
  updateAssets: (type: MediaAsset, key: string) => void,
  isUploaded: boolean | undefined
) => {
  const { mutateAsync: createPresignedUrl } =
    trpc.posts.createPresignedUrl.useMutation();

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(isUploaded || false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    file: File | undefined
  ) => {
    console.log("hello");
    if (!file) return;
    if (file.name.length > 10) {
      toast.error("File name is too long,try to make it shorter");
      return;
    }
    setUploading(true);
    const {
      url: { fields, url },
      key,
    } = await createPresignedUrl({ filename: file.name });

    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await fetch(url, {
        method: "POST",
        body: formData,
      });
      setUploading(false);
      setUploaded(true);
      updateAssets(type, key);
      toast.success("Successfully upload the file");
    } catch {
      toast.error("Failed to upload the asset");
      setUploading(false);
    }
  };

  const handleUploadState = (): JSX.Element => {
    if (type == "video" && !uploading) {
      return <span>Upload Video</span>;
    } else if (type == "image" && !uploading) {
      return <span>Upload Photo</span>;
    }
    if (uploading) {
      return (
        <div className="flex items-center gap-4">
          <LoadingSpinner className="h-8 w-8 animate-spin font-medium text-black" />
          <span>Uploading...</span>
        </div>
      );
    }
    return <></>;
  };

  const handleUploadedState = () => {
    if (uploaded) {
      return (
        <IconChecks className="h-10 w-10 font-medium text-green-500 lg:h-20 lg:w-20" />
      );
    }
    if (type == "image") {
      return (
        <IconPolaroid className="h-10 w-10 font-medium text-gray-800 lg:h-20 lg:w-20" />
      );
    } else if (type == "video") {
      return (
        <IconMovie className="h-10 w-10 font-medium text-gray-800 lg:h-20 lg:w-20" />
      );
    }
  };

  return {
    handleUploadedState,
    handleUpload,
    handleUploadState,
  };
};

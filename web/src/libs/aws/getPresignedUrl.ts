import { clientEnv } from "../../env/schema.mjs";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
const client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: clientEnv.NEXT_PUBLIC_AWS_CLIENT_ID as string,
    secretAccessKey: clientEnv.NEXT_PUBLIC_AWS_CLIENT_SECRET as string,
  },
});

export const getPresignedUrl = async (name: string | undefined) => {
  const result = await createPresignedPost(client, {
    Bucket: clientEnv.NEXT_PUBLIC_AWS_BUCKET as string,
    Key: name as string,
    Expires: 36000,
  });

  return result;
};

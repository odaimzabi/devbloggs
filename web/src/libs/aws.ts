import AWS from "aws-sdk";
import { clientEnv } from "../env/schema.mjs";

const s3 = new AWS.S3({
  region: "eu-central-1",
  credentials: {
    accessKeyId: clientEnv.NEXT_PUBLIC_AWS_CLIENT_ID as string,
    secretAccessKey: clientEnv.NEXT_PUBLIC_AWS_CLIENT_SECRET as string,
  },
});

export const getPresignedUrl = async (name: string | undefined) => {
  const result = s3.createPresignedPost({
    Bucket: clientEnv.NEXT_PUBLIC_AWS_BUCKET,
    Fields: {
      key: name,
    },
    Expires: 60000, 
  });
  return result;
};

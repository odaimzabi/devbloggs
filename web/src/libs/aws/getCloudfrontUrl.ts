import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { clientEnv } from "../../env/schema.mjs";

const client = new SecretsManagerClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: clientEnv.NEXT_PUBLIC_AWS_CLIENT_ID as string,
    secretAccessKey: clientEnv.NEXT_PUBLIC_AWS_CLIENT_SECRET as string,
  },
});

export const getPrivateKey = async () => {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: "AWS_CDN_PK",
        VersionStage: "AWSCURRENT",
      })
    );
    const secret = response.SecretString;
    return secret;
  } catch (error) {
    console.log(error);
  }
};

export const getCloudFrontUrl = async (key: string) => {
  if (!key) {
    return "";
  }
  const result = await getPrivateKey();
  try {
    const signedUrl = getSignedUrl({
      url: `${clientEnv.NEXT_PUBLIC_AWS_CDN_URL}/${key}`,
      keyPairId: clientEnv.NEXT_PUBLIC_AWS_CDN_KP as string,
      dateLessThan: "2023-01-01",
      privateKey: result as string,
    });
    return signedUrl;
  } catch (err) {
    console.log(err);
  }
};

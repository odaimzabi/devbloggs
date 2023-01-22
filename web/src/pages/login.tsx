import React from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { GetServerSideProps } from "next";
import { IconBrandGoogle } from "@tabler/icons";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

function getIcon(providerType: string) {
  if (providerType == "google") {
    return <IconBrandGoogle />;
  }
}

const LoginButton = ({ provider }: { provider: ClientSafeProvider }) => (
  <button
    className="flex items-center gap-4 rounded-md border border-indigo-500 p-4 text-lg font-medium"
    onClick={() => signIn(provider.id)}
  >
    {getIcon(provider.id)}
    Sign in with {provider.name}
  </button>
);

function LoginPage({ providers }: Props) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 ">
      <h2 className="text-2xl font-bold ">Sign in with your account</h2>
      <div className=" flex items-center justify-center ">
        {Object.values(providers).map((provider) => (
          <LoginButton provider={provider} key={provider.name} />
        ))}
      </div>
    </div>
  );
}

export default LoginPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const providers = (await getProviders()) as Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  return {
    props: { providers },
  };
};

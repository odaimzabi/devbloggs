import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Layout from "../components/layouts/Layout";
import DashboardScreen from "../modules/dashboard/DashboardScreen";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return <h1>hello</h1>;
};

export default Home;

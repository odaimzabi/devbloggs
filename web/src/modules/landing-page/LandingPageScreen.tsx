import Head from "next/head";
import React from "react";
import Features from "./Features";
import Hero from "./Hero";
import LPNavbar from "./LPNavbar";

function LandingPageScreen() {
  return (
    <>
      <Head>
        <title>Home | Devblog</title>
      </Head>
      <div className="h-screen">
        <LPNavbar />
        <Hero />
        <Features />
      </div>
    </>
  );
}

export default LandingPageScreen;

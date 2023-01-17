import Head from "next/head";
import React from "react";
import Features from "./Features";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

function LandingPageScreen() {
  return (
    <>
      <Head>
        <title>Home | Devblog</title>
      </Head>
      <main>
        <Hero />
        <Features />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}

export default LandingPageScreen;

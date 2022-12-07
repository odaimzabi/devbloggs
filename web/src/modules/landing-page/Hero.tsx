import React from "react";
import Button from "../../components/common/Button";

function Hero() {
  return (
    <div className="h-100">
      <div className="flex flex-col items-center justify-center gap-4 bg-indigo-600 p-8">
        <h1 className="text-2xl font-medium text-white">
          Welcome to Devblogg!
        </h1>
        <h1 className="text-center text-xl font-light text-white">
          A site where you post creative blog posts for your followers.
        </h1>
        <Button
          text="Sign up for free"
          className="bg-white text-indigo-600 hover:bg-white"
        />
      </div>
    </div>
  );
}

export default Hero;

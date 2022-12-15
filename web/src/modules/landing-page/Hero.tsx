import React from "react";
import Button from "../../components/common/Button";

function Hero() {
  return (
    <div className="h-100 flex items-center justify-center bg-gray-100 p-3">
      <div className="flex  flex-col items-center justify-center text-center md:flex-row md:text-left lg:flex-row  lg:text-left">
        <div className="flex flex-col  gap-4 p-3">
          <h1 className="text-2xl font-medium text-black">
            Welcome to Devblogg!
          </h1>
          <p className="text-2xl  font-normal text-black">
            A site where you post creative blog posts for your followers.
          </p>
          <Button
            text="Sign up for free"
            className="bg-indigo-600 text-white"
          />
        </div>
        <div className="md:w-3/2">
          <img src="/image_hero.svg" alt="Hero image" />
        </div>
      </div>
    </div>
  );
}

export default Hero;

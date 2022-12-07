import React from "react";
import Image from "next/image";
const Feature = ({
  title,
  description,
  img,
  reversed,
}: {
  title: string;
  description: string;
  img: string;
  reversed: boolean;
}) => (
  <>
    <div
      className={`mt-4 flex flex-col items-center justify-center ${
        reversed
          ? "md:flex-row-reverse lg:flex-row-reverse"
          : "md:flex-row lg:flex-row"
      }`}
    >
      <div className="w-full text-center sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-6 text-xl leading-9 text-gray-400">{description}</p>
      </div>
      <div className="w-full p-6 ">
        <img src={img} alt="Feature" />
      </div>
    </div>
  </>
);

const features = [
  {
    title: "Create blog posts with ease",
    description:
      "You can easily create blog posts related related to IT Field with the option to include videos/images",
    img: "/feature1.png",
    reversed: false,
  },
  {
    title: "Earn money from your blog posts",
    description:
      "You can start earning money on your own blog posts using a built in subscription option in your personal site",
    img: "/feature2.webp",
    reversed: true,
  },
  {
    title: "Subscribe to your favorite creator",
    description:
      "You can also subscribe to other creators and your subscription will be added to your account",
    img: "/feature3.png",
    reversed: false,
  },
];

function Features() {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-center justify-center gap-4 p-8 ">
        <h1 className="text-center text-2xl font-bold">
          Here are the top features in DevBlog
        </h1>
        <div className="mt-4 flex flex-col  items-center justify-center gap-4 ">
          {features.map((feature, index) => (
            <Feature
              img={feature.img}
              title={feature.title}
              description={feature.description}
              key={index}
              reversed={feature.reversed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;

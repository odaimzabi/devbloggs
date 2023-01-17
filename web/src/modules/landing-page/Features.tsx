import React from "react";
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
      className={`mt-4 flex flex-col items-center justify-center gap-2 ${
        reversed
          ? "md:flex-row-reverse lg:flex-row-reverse"
          : "md:flex-row lg:flex-row"
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-6  text-center text-xl leading-9 text-gray-400">
          {description}
        </p>
      </div>
      <div className="md:w-1/2">
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
    title: "A custom website for you",
    description:
      "All of your published posts will be available in your custom site!",
    img: "/feature2.svg",
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

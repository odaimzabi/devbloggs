import Image from "next/image";
import React from "react";
import defaultImage from "../../assets/student.jpeg";

export const ImageCard = React.forwardRef(({ src }: { src: string }, _ref) => (
  <Image
    width={400}
    height={170}
    className="cursor-pointer "
    src={src ? src : defaultImage}
    alt="Post image"
    placeholder="blur"
    blurDataURL={src}
  />
));

ImageCard.displayName = "Image";

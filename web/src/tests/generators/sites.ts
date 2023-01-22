import { faker } from "@faker-js/faker";
import { PostStatus } from "@prisma/client";
import { SiteData } from "../../types";
import { postGenerator } from "./posts";

export const siteGenerator = () => {
  return {
    user: {
      image: faker.image.abstract(),
      name: faker.name.fullName(),
    },
    posts: [postGenerator()],
    id: faker.datatype.uuid(),
    description: faker.lorem.paragraph(),
    domain: faker.name.fullName().split(" ").join(""),
    facebook: faker.internet.url(),
    linkedin: faker.internet.url(),
    price: "200",
  };
};

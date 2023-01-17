import { faker } from "@faker-js/faker";
import { PostStatus } from "@prisma/client";
import { DashboardData } from "../../types";

export const postGenerator = () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(3),
    subtitle: faker.lorem.sentence(3),
    image: faker.image.abstract(),
    status: PostStatus.Draft,
  };
};

export const postsGenerator = (length = 3) => {
  const posts = Array.from({ length }, postGenerator);
  return { posts } as DashboardData;
};

/**
 * @jest-environment jsdom
 */

import DashboardScreen from "../../../modules/dashboard/DashboardScreen";
import { DashboardData } from "../../../types";
import { fireEvent, mockRouter, render, waitFor } from "../../utils";
import { postsGenerator } from "../../helpers/posts";

describe("Dashboard screen", () => {
  it("should load with no errors", () => {
    const posts: DashboardData = { posts: [] };
    expect(() => render(<DashboardScreen posts={posts} />)).not.toThrowError();
  });

  it("should load with no errors if posts are passed", async () => {
    const data = postsGenerator();
    expect(() => render(<DashboardScreen posts={data} />)).not.toThrowError();
  });

  it("should redirect to edit post screen if user clicked on post title", async () => {
    const data = postsGenerator(1);
    const { getByTestId } = render(<DashboardScreen posts={data} />);
    const postTitle = getByTestId("post-link");
    await waitFor(() => fireEvent?.click(postTitle as HTMLElement));

    expect(mockRouter.push).toBeCalledTimes(1);
  });
});

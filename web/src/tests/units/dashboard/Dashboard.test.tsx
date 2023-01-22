/**
 * @jest-environment jsdom
 */
import DashboardScreen from "../../../modules/dashboard/DashboardScreen";
import { DashboardData } from "../../../types";
import {
  fireEvent,
  mockRouter,
  render,
  screen,
  trpcRequest,
} from "../../utils";
import { postsGenerator } from "../../generators/posts";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: "test",
      image: "https://loremflickr.com/640/480/abstract",
      id: "1",
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("Dashboard screen", () => {
  it("should load with no errors", () => {
    const posts: DashboardData = { posts: [] };
    expect(() => render(<DashboardScreen posts={posts} />)).not.toThrowError();
  });
  it("should show username of authenticated user", async () => {
    const data = postsGenerator();
    render(<DashboardScreen posts={data} />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should load with no errors if posts are passed", async () => {
    const data = postsGenerator();
    expect(() => render(<DashboardScreen posts={data} />)).not.toThrowError();
  });

  it("should redirect to edit post screen if user clicked on post title", async () => {
    const data = postsGenerator(1);
    const { getByTestId } = render(<DashboardScreen posts={data} />);
    const postTitle = getByTestId("post-link");
    fireEvent.click(postTitle);

    expect(mockRouter.push).toBeCalledTimes(1);
  });

  it("should display the pagination buttons", async () => {
    const data = postsGenerator();
    const { findAllByLabelText } = render(<DashboardScreen posts={data} />);
    const paginationButtons = await findAllByLabelText("pagination");
    expect(paginationButtons.length).toBe(2);
  });
});

/**
 * @jest-environment jsdom
 */
import EditPostForm from "../../../modules/dashboard/EditPostForm";
import EditPostScreen from "../../../modules/dashboard/EditPostScreen";
import { postGenerator } from "../../generators/posts";
import { fireEvent, render, screen, waitFor } from "../../utils";

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
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Edit post screen", () => {
  it("should load with no errors", async () => {
    expect(() => render(<EditPostScreen />)).not.toThrowError();
  });
  it("should show username of authenticated user", async () => {
    render(<EditPostScreen />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("should submit data with no errors", async () => {
    const onSubmit = jest.fn() as () => void;
    const handlePublishPost = jest.fn() as () => void;
    const post = postGenerator();
    const { findByTestId } = render(
      <EditPostForm
        onSubmit={onSubmit}
        handlePublishPost={handlePublishPost}
        post={post}
        isUpdatingPost={false}
        isPublishingPost={false}
      />
    );

    const post_title = await findByTestId("post_title");
    const post_subtitle = await findByTestId("post_subtitle");
    const post_description = await findByTestId("post_description");
    const github_repo = await findByTestId("github_repo");
    const submit_button = await findByTestId("createPost_btn");

    await waitFor(() => fireEvent.submit(submit_button));

    expect(post_title).toHaveAttribute("aria-invalid", "false");
    expect(post_subtitle).toHaveAttribute("aria-invalid", "false");
    expect(post_description).toHaveAttribute("aria-invalid", "false");
    expect(github_repo).toHaveAttribute("aria-invalid", "false");
  });
});

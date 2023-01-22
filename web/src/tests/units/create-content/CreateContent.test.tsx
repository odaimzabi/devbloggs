/**
 * @jest-environment jsdom
 */
import CreateContentForm from "../../../modules/create-content/CreateContentForm";
import CreateContentScreen from "../../../modules/create-content/CreateContentScreen";
import { fireEvent, render, waitFor } from "../../utils";

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

describe("Create content screen", () => {
  it("should load with no errors", () => {
    expect(() => render(<CreateContentScreen />)).not.toThrowError();
  });

  it("should show errors if user tries to submit the form with empty inputs", async () => {
    const onSubmit = jest.fn() as () => void;

    const { findByTestId } = render(
      <CreateContentForm onSubmit={onSubmit} isCreatingPost={false} />
    );
    const submit_button = await findByTestId("createPost_btn");

    const post_title = await findByTestId("post_title");
    const post_subtitle = await findByTestId("post_subtitle");
    const post_description = await findByTestId("post_description");
    const github_repo = await findByTestId("github_repo");

    fireEvent.submit(submit_button);

    await waitFor(() =>
      expect(post_title).toHaveAttribute("aria-invalid", "true")
    );
    await waitFor(() =>
      expect(post_subtitle).toHaveAttribute("aria-invalid", "true")
    );
    await waitFor(() =>
      expect(post_description).toHaveAttribute("aria-invalid", "true")
    );
    await waitFor(() =>
      expect(github_repo).not.toHaveAttribute("aria-invalid", "true")
    );
  });
});

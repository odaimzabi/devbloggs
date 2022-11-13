import {
  render,
  fireEvent,
  within,
  screen,
  renderHook,
} from "@testing-library/react";
import user from "@testing-library/user-event";

import { useRouter } from "next/router";
import CreateContentPage from "../../src/pages/create-content";
import { AppRouter } from "../../src/server/trpc/router/_app";
import { trpc } from "../../src/utils/trpc";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Create Content Test", () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => ({
      route: "/create-content",
    }));
    jest.spyOn(trpc, "withTRPC");
  });
  it("should render the heading and the inputs", async () => {
    render(<CreateContentPage />);
    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();
  });

  // it("should display errors on empty inputs", async () => {
  //   const page = render(
  //     <QueryClientProvider client={client} contextSharing>
  //       <CreateContentPage />
  //     </QueryClientProvider>
  //   );
  //   const createPostBtn = await page.findByTestId("createPost_btn");
  //   await user.click(createPostBtn);
  //   const errors = await page.findAllByTestId("error");
  //   expect(errors.length).toEqual(3);
  // });
  it("should not create a post with invalid github repo", async () => {});
});

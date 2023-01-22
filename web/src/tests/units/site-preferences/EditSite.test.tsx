/**
 * @jest-environment jsdom
 */
import { fireEvent, mockRouter, render, screen } from "../../utils";
import SitePreferencesScreen from "../../../modules/site-preferences/SitePreferencesScreen";
import EditSiteForm from "../../../modules/site-preferences/EditSiteForm";
import { siteGenerator } from "../../generators/sites";

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

describe("Edit site screen", () => {
  it("should load screen with no errors", () => {
    expect(() => render(<SitePreferencesScreen />)).not.toThrowError();
  });
  it("should show username of authenticated user", () => {
    render(<SitePreferencesScreen />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("should redirect to your site when you click on live preview", async () => {
    const onSubmit = jest.fn();
    const site = siteGenerator();
    const { findByText } = render(
      <EditSiteForm
        onSubmit={onSubmit as () => void}
        isLoading={false}
        site={site}
      />
    );
    const livePreviewBtn = await findByText(/Live Preview/i);

    fireEvent.click(livePreviewBtn);

    expect(mockRouter.push).toBeCalledTimes(1);
  });
});

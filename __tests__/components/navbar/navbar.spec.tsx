import { Navbar } from "@/app/components/navbar/Navbar";
import { renderWithProviders } from "@/utils/test-utils";

describe("Navbar component", () => {
  jest.mock("next/router", () => ({
    useRouter: jest.fn(),
  }));

  it("should render correctly ", () => {
    const { container } = renderWithProviders(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});

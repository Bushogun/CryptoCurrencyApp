import { renderWithProviders } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import { SearchBarForm } from "@/app/components/search-bar/search-bar-form";

jest.mock("next/router", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => {}),
  };
});

describe("SearchBarForm component", () => {
  it("should render correctly ", () => {
    const { container } = renderWithProviders(<SearchBarForm />);
    expect(container).toMatchSnapshot();
  });
  
    it("should update search query when input value changes", async () => {
      const { store } = renderWithProviders(<SearchBarForm />);
      const input = screen.getByPlaceholderText("Search");
      const query = "Bitcoin";
      await userEvent.type(input, query);
  
      expect(input).toHaveValue(query);
      const stateQuery = store.getState().crypto.filterQuery;
      expect(stateQuery).toBe(query);
    });
  });

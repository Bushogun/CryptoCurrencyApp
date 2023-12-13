import { renderWithProviders } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
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
  
    // it("should update search query when input value changes", async () => {
    //   const { store } = renderWithProviders(<SearchBarForm />);
    //   const input = screen.getByPlaceholderText("Search");
    //   const query = "Bitcoin";
    //   await userEvent.type(input, query);
  
    //   expect(input).toHaveValue(query);
    //   const stateQuery = store.getState().currencyReducer.filterQuery;
    //   expect(stateQuery).toBe(query);
    // });
  
    // it("should clear search query on form submission if empty", async () => {
    //   const { store } = renderWithProviders(<SearchBarForm />);
    //   const input = screen.getByPlaceholderText("Search");
  
    //   const query = "";
    //   await userEvent.type(input, query);
    //   fireEvent.submit(screen.getByRole("form", { name: "form-search" }));
    //   expect(input).toHaveValue("");
    //   const stateQuery = store.getState().currencyReducer.filterQuery;
    //   expect(stateQuery).toBe("");
    // });
  
    // it("should not clear search query on form submission if not empty", async () => {
    //   const { store } = renderWithProviders(<SearchBarForm />);
    //   const input = screen.getByPlaceholderText("Search");
  
    //   const query = "iphone";
    //   await userEvent.type(input, query);
    //   fireEvent.submit(screen.getByRole("form", { name: "form-search" }));
    //   expect(input).toHaveValue(query);
    //   const stateQuery = store.getState().currencyReducer.filterQuery;
    //   expect(stateQuery).toBe(query);
    // });
  });

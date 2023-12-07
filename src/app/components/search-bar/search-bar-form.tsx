import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import { setSearchQuery } from "@/src/store/productSlice";
import useProductData from "@/app/hooks/useProductData";
import styles from "@/app/components/search/search-bar-form.module.scss";

export const SearchBarForm = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.product.searchQuery);
  const [searchTerm, setSearchTerm] = useState(query);

  useProductData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      dispatch(setSearchQuery(searchTerm));
    }
  };

  return (
    <form
      aria-label="form-search"
      className={styles.container}
      onSubmit={handleSearch}
    >
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleInputChange}
          required={true}
          alt="search product"
        />

        <div className={"input-group-append"}>
          <button className={"btn btn-search"} type="submit">
            <FiSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

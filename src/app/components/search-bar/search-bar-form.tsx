'use client'
import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setFilterQuery } from "@/redux/features/crypto-slice";
import styles from "@/app/components/search-bar/search-bar-form.module.scss";

export const SearchBarForm = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.crypto.filterQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    dispatch(setFilterQuery(searchTerm));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setFilterQuery(''));
    };
  }, [dispatch]);
  return (
    <form
      aria-label="form-search"
      className={styles['container']}
      onSubmit={handleSearch}
    >
      <div className={styles['input-group']}>
        <input
          type="text"
          className="form-control"
          name="Search"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          required={true}
          alt="search coin"
        />

        <div className={"input-group-append"}>
          <button className={styles['btn-search']} type="submit">
            <FiSearch />
          </button>
        </div>
      </div>
    </form>
  );
};
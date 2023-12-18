import React, { Component } from "react";
import { FiSearch } from "react-icons/fi";
import { connect } from "react-redux";
import { RootState } from "@/redux/store";
import { setFilterQuery } from "@/redux/features/crypto-slice";
import styles from "@/app/components/search-bar/search-bar-form.module.scss";

interface SearchBarFormProps {
  filterQuery: string;
  setFilterQuery: (query: string) => void;
}

interface SearchBarFormState {
  query: string;
}

class SearchBarForm extends Component<SearchBarFormProps, SearchBarFormState> {
  constructor(props: SearchBarFormProps) {
    super(props);

    this.state = {
      query: props.filterQuery,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    this.setState({ query: searchTerm });
    this.props.setFilterQuery(searchTerm);
  }

  handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  render() {
    const { query } = this.state;

    return (
      <form
        aria-label="form-search"
        className={styles["container"]}
        onSubmit={this.handleSearch}
      >
        <div className={styles["input-group"]}>
          <input
            type="text"
            className="form-control"
            name="Search"
            placeholder="Search"
            value={query}
            onChange={this.handleInputChange}
            required={true}
            alt="search coin"
          />
          <div className={"input-group-append"}>
            <button className={styles["btn-search"]} type="submit">
              <FiSearch />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  filterQuery: state.crypto.filterQuery,
});

const mapDispatchToProps = {
  setFilterQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarForm);

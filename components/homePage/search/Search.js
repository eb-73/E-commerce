import style from "./Search.module.css";
import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
const Search = () => {
  const router = useRouter();
  const searchValue = useRef();
  const [searchMode, setSearchMode] = useState("All");
  const changeSearchHandler = (e) => {
    if (e.target.checked) setSearchMode(e.target.value);
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    if (searchValue.current.value.trim()) {
      router.push(
        `/search/?q=${searchValue.current.value}&filter=${searchMode}`,
        undefined,
        {
          shallow: true,
        }
      );
    }
  };
  return (
    <div className={`pt-5 ${style.search}`}>
      <h1>Search</h1>
      <form onSubmit={searchHandler} className={style.searchForm}>
        <div
          className={`d-flex justify-content-start justify-content-sm-between align-items-center px-1 px-sm-4 ${style.inputGroup}`}
        >
          <SearchIcon className={`d-block d-sm-none mx-2 ${style.formIcon}`} />
          <input
            className={style.searchBar}
            type="text"
            placeholder="write somethings"
            ref={searchValue}
          />
          <div
            className={`d-none d-sm-flex justify-content-between ${style.searchSelect}`}
          >
            <input
              id="allCat"
              type="radio"
              onChange={changeSearchHandler}
              name="selec"
              value="All"
              defaultChecked="true"
            />
            <label htmlFor="allCat">All</label>
            <input
              id="cat1"
              type="radio"
              onChange={changeSearchHandler}
              name="selec"
              value="Clothing"
            />
            <label htmlFor="cat1">Clothing</label>
            <input
              id="cat2"
              type="radio"
              onChange={changeSearchHandler}
              name="selec"
              value="Shoes"
            />
            <label htmlFor="cat2">Shoes</label>
          </div>
          <div className={`dropdown d-sm-none  ${style.searchSelect2}`}>
            <button
              className="btn btn-secondary dropdown-toggle d-flex align-items-center justify-content-between"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {searchMode}
            </button>

            <div
              className={`dropdown-menu ${style.dropdown}`}
              aria-labelledby="dropdownMenuButton"
            >
              <input
                id="allCat"
                type="radio"
                onChange={changeSearchHandler}
                name="selec"
                value="All"
              />
              <label htmlFor="allCat" className="dropdown-item">
                All
              </label>
              <input
                id="cat1"
                type="radio"
                onChange={changeSearchHandler}
                name="selec"
                value="Clothing"
              />
              <label htmlFor="cat1" className="dropdown-item">
                Clothing
              </label>
              <input
                id="cat2"
                type="radio"
                onChange={changeSearchHandler}
                name="selec"
                value="Shoes"
              />
              <label htmlFor="cat2" className="dropdown-item">
                Shoes
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`d-none d-sm-flex align-items-center justify-content-center ${style.searchButton}`}
        >
          <SearchIcon className={style.formIcon} />
        </button>
      </form>
    </div>
  );
};
export default Search;

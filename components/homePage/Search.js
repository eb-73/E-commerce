import style from "./Search.module.css";
import { SearchIcon } from "@heroicons/react/outline";
const Search = () => {
  return (
    <div className={`pt-2 ${style.search}`}>
      <h1>Search</h1>
      <form className={style.searchForm}>
        <div className={`d-flex px-1 px-sm-4 ${style.inputGroup}`}>
          <SearchIcon className={`d-block d-sm-none mx-2 ${style.formIcon}`} />
          <input type="text" placeholder="write somethings" />
        </div>

        <button
          type="submit"
          className=" d-none d-sm-flex align-items-center justify-content-center"
        >
          <SearchIcon className={style.formIcon} />
        </button>
      </form>
    </div>
  );
};
export default Search;

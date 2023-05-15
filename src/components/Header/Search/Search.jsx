import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import makeSearch from "../../../api/makeSearch";
import waiter from "../../../utils/waiter";

const SearchResults = (props) => {
  const handleClick = () => {
    props.setVisible(false);
  };

  if (props.data != null) {
    return (
      <>
        <div
          className={
            props.visible ? "search-results visible" : "search-results"
          }
        >
          {props.data.results.map((movie, index) => {
            if (index < 5) {
              return (
                <span key={movie.id} className="search-result">
                  <Link
                    to={`/details/${movie.id}`}
                    state={{ movieData: movie }}
                    onClick={handleClick}
                  >
                    {movie.title}
                  </Link>
                </span>
              );
            } else {
              return <div key={index}></div>;
            }
          })}
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
};

const Search = () => {
  const searchRef = useRef(null);
  const searchBarRef = useRef(null);

  const [data, setData] = useState(null);
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = async (event) => {
      if (!searchBarRef.current.contains(event.target)) {
        console.log("click exterieur");
        await waiter(100);
        setResultsVisible(false);
      } else {
        console.log("click interieur");
        setResultsVisible(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleKeyUp = async () => {
    const _data = await makeSearch(searchBarRef.current.value);
    console.log(_data);
    setData(_data);
  };

  return (
    <>
      <div className="search" ref={searchRef}>
        <input
          ref={searchBarRef}
          type="text"
          name="search"
          className="search-bar"
          onChange={handleKeyUp}
        />
        <button className="search-button">Search</button>
        <SearchResults
          visible={resultsVisible}
          setVisible={setResultsVisible}
          data={data}
        />
      </div>
    </>
  );
};

export default Search;

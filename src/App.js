import React, { useState, useEffect } from "react";

import Items from "./components/Items";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import useDebounce from "./hooks/useDebounce";
import NameSearch from "./components/NameSearch";

import "./App.css";

function App() {
  //pagination and filters states
  const [data, setData] = useState([]);
  const [apiFilters, setApiFilters] = useState([]);
  const [paginationSize, setPaginationSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // debounce states
  const [searchTerm, setSearchTerm] = useState([]);

  //debounse useEffect
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    fetchBeers(apiFilters, searchTerm, paginationSize, currentPage);
  }, [debouncedSearchTerm]);

  // filters useEffect
  useEffect(() => {
    fetchBeers(apiFilters, searchTerm, paginationSize, currentPage);
  }, [apiFilters, paginationSize, currentPage]);

  async function fetchBeers(
    apiFilters,
    searchName,
    paginationSize = "10",
    currentPage = "1"
  ) {
   
    const serachfieldTotal = apiFilters.join('') + searchName.join('') // приводим к строке
    const request = await fetch(
      `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${paginationSize}${serachfieldTotal}`
    );
    const response = await request.json();
    setData(response);
    console.log("request");
    return request;
  }

  const paginationHandler = (e) => {
    setPaginationSize(e.target.value);
  };

  const currentPageHandler = (direction) => {
    if (direction) {
      // if true  + 1 page else - 1 page
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h3>Beer wiki</h3>

      <NameSearch setSearchTerm={setSearchTerm}></NameSearch>
      <Filters
        getApiFilters={setApiFilters}
        setCurrentPage={setCurrentPage}
      ></Filters>
      <Pagination
        paginationHandler={paginationHandler}
        currentPageHandler={currentPageHandler}
        currentPage={currentPage}
        isLastPage={data.length < paginationSize}
      ></Pagination>
      {data.length ? (
        <Items beers={data} />
      ) : (
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fs2.quickmeme.com%2Fimg%2Fad%2Fadcc6c55bfe77d21f6e9ab8054a595592ee6228f4b17b4c0c9b44983ca807a09.jpg&f=1&nofb=1"
          alt="no"
        ></img>
      )}
    </div>
  );
}

export default App;

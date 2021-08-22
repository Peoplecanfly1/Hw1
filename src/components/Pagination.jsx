import React, { useState } from "react";

import "../styles/pagination.css";

const options = [10, 20, 30, 40, 50];

const Pagination = ({ paginationHandler, currentPageHandler }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const changeHandler = (e) => {
    paginationHandler(e);
  };

  const clickBack = () => {
    if (currentPage <= 1) {
      currentPageHandler(1);
    } else {
      setCurrentPage(currentPage - 1);
      currentPageHandler(currentPage - 1);
    }
  };

  const clickForward = () => {
    setCurrentPage(currentPage + 1);
    currentPageHandler(currentPage + 1);
  };

  return (
    <div className="pagination">
      <p> Select page items q-ty</p>
      <select onChange={changeHandler} className="form-select">
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <div className="pagination-buttons">
        <button onClick={clickBack} className="btn btn-success btn-sm">
          Back
        </button>
        <button onClick={clickForward} className="btn btn-success btn-sm">
          Forward
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import { useDispatch } from "react-redux";
import { setSortBy } from "../features/products/productSlice";
import React, { useState } from "react";

const Filter = ({
  checkboxFilter,
  handleChangeCheckbox,
  handleClearFilter,
  filterByRating,
  handleRatingChange,
  selectedPriceFilters,
  handlePriceFilterChange,
}) => {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortOrder = (e) => {
    setSelectedSort(e.target.value);
    dispatch(setSortBy(e.target.value));
  };

  const handleClearAllFilters = () => {
    handleClearFilter();
    setSelectedSort("");
  };

  return (
    <div className="col-md-3 py-2 my-2">
      <div className=" container">
        <div className="d-flex justify-content-between">
          <span>Filters</span>
          <button onClick={handleClearAllFilters} className="btn btn-primary">
            Clear
          </button>
        </div>
        <h6>Category</h6>
        <label>
          {" "}
          <input
            type="checkbox"
            value="Fiction"
            checked={checkboxFilter.includes("Fiction")}
            onChange={handleChangeCheckbox}
          />{" "}
          Fiction{" "}
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Non-Fiction"
            checked={checkboxFilter.includes("Non-Fiction")}
            onChange={handleChangeCheckbox}
          />{" "}
          Non-Fiction{" "}
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Historical"
            checked={checkboxFilter.includes("Historical")}
            onChange={handleChangeCheckbox}
          />{" "}
          Historical{" "}
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Romance"
            checked={checkboxFilter.includes("Romance")}
            onChange={handleChangeCheckbox}
          />{" "}
          Romance{" "}
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Fantasy"
            checked={checkboxFilter.includes("Fantasy")}
            onChange={handleChangeCheckbox}
          />{" "}
          Fantasy{" "}
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Mystery"
            checked={checkboxFilter.includes("Mystery")}
            onChange={handleChangeCheckbox}
          />{" "}
          Mystery{" "}
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Thriller"
            checked={checkboxFilter.includes("Thriller")}
            onChange={handleChangeCheckbox}
          />{" "}
          Thriller{" "}
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Business"
            checked={checkboxFilter.includes("Business")}
            onChange={handleChangeCheckbox}
          />{" "}
          Business
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="Kids"
            checked={checkboxFilter.includes("Kids")}
            onChange={handleChangeCheckbox}
          />{" "}
          Kids{" "}
        </label>
        <hr />

        <h6>Rating</h6>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={filterByRating}
          onChange={handleRatingChange}
        />
        <span> {filterByRating} </span>
        <br />
        <h6>Price</h6>
        {/* <form id="priceFilter" > */}
        <label>
          <input
            type="checkbox"
            value="below500"
            checked={selectedPriceFilters.includes("below500")}
            onChange={handlePriceFilterChange}
            className="me-1"
          />{" "}
          below Rs.500
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="500to1000"
            checked={selectedPriceFilters.includes("500to1000")}
            onChange={handlePriceFilterChange}
            className="me-1"
          />{" "}
          above Rs.500 and below Rs.1000
        </label>
        <br />
        <label>
          {" "}
          <input
            type="checkbox"
            value="above1000"
            checked={selectedPriceFilters.includes("above1000")}
            onChange={handlePriceFilterChange}
            className="me-1"
          />{" "}
          above Rs.1000
        </label>
        <hr />

        {/* </form> */}
        <h6>Sort By Price</h6>
        <label>
          <input
            type="radio"
            name="sort"
            value="lowtohigh"
            checked={selectedSort === "lowtohigh"}
            onChange={handleSortOrder}
          />{" "}
          Low to High
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="sort"
            value="hightolow"
            checked={selectedSort === "hightolow"}
            onChange={handleSortOrder}
          />{" "}
          High to Low
        </label>
      </div>
    </div>
  );
};

export default Filter;

import React, { useState } from "react";
import Helicopter from "../../components/Helicopters/Helicopter";
import Table from "./table";

interface FilterProps {
  helicopters: Helicopter[];
}

const convertPrice = (priceString) => {
  if (priceString !== "") {
    return +priceString?.replace(/[^\d.,]/g, "").replace(",", ""); //remove non-numeric and then replace comma to empty string
  } else {
    return 0;
  }
};

const FilterComponent = ({ helicopters }: FilterProps) => {
  const [filterCriteria, setFilterCriteria] = useState({
    minQuantity: 1,
    minPrice: 0,
    filterByName: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const filteredHelicopters = helicopters.filter((helicopter) => {
    const numericPrice = convertPrice(helicopter["Price ($)"]);
    return (
      +filterCriteria.minQuantity <= +helicopter.Quantity &&
      numericPrice >= filterCriteria.minPrice &&
      helicopter.Name?.toLowerCase().includes(
        filterCriteria.filterByName.toLowerCase()
      )
    );
  });

  const tableHeaders = [
    "Name",
    "Type",
    "Quantity",
    "Price",
    "Failure Rate",
    "Description",
    "Parent",
  ];

  const tableColumn = [
    "Name",
    "Type",
    "Quantity",
    "Price ($)",
    "Failure rate (1/year)",
    "Description",
    "Parent",
  ];

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="filterByName"
          value={filterCriteria.filterByName}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Min Quantity:
        <input
          type="number"
          name="minQuantity"
          value={filterCriteria.minQuantity}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Min Price:
        <input
          type="number"
          name="minPrice"
          value={filterCriteria.minPrice}
          onChange={handleFilterChange}
        />
      </label>

      <Table
        headers={tableHeaders}
        column={tableColumn}
        body={filteredHelicopters}
      ></Table>
    </div>
  );
};

export default FilterComponent;

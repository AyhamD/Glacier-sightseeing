import React, { useState } from "react";
import "./HelicopterList.css";
import FilterComponent from "../../../shared/components/filter-table";

const HelicopterList = ({ helicopters }) => {
  return (
    <div className="helicopter-list">
      <h1>Helicopter Offers</h1>
      <FilterComponent helicopters={helicopters} />
    </div>
  );
};

export default HelicopterList;

import React, { useRef, useState } from "react";
import HelicopterList from "./HelicopterList/HelicopterList";
import FileUpload from "../../shared/files/FileUpload";
import CsvParser from "../../shared/files/CsvParser";
import "./Helicopter.css";
import CustomButton from "../../shared/buttons/button";
import Table from "../../shared/components/table";

interface Helicopter {
  Name: string;
  Type: string;
  Quantity: number;
  "Price ($)": string;
  "Failure rate (1/year)": number;
  Description: string;
  Parent: string;
  OperatingCost: number;
  totalCost: number;
}

const Helicopter = () => {
  const hasParsed = useRef(false);
  const [helicopters, setHelicopters] = useState<Helicopter[]>([]);
  const [bestHelicopter, setBestHelicopter] = useState<Helicopter>();
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const convertPrice = (priceString) => {
    if (priceString !== "") {
      return +priceString?.replace(/[^\d.,]/g, "").replace(",", ""); //remove non-numeric and then replace comma to empty string
    } else {
      return 0;
    }
  };

  const calculateOperatingCost = (helicopter: Helicopter): number => {
    const price = convertPrice(helicopter["Price ($)"]);
    const failureRate = +helicopter["Failure rate (1/year)"];

    return isNaN(price) || isNaN(failureRate) ? 0 : price * failureRate;
  };

  const calculateTotalCost = (helicopter: Helicopter): number => {
    const purchaseCost = convertPrice(helicopter["Price ($)"]);
    const operatingCost = calculateOperatingCost(helicopter);

    return isNaN(purchaseCost) || isNaN(operatingCost)
      ? 0
      : purchaseCost + operatingCost;
  };

  const handleParse = (data: Helicopter[]) => {
    if (data && data.length > 0) {
      const helicoptersWithCost = data
        .filter((helicopter) => helicopter["Price ($)"] !== "")
        .map((helicopter) => ({
          ...helicopter,
          OperatingCost: calculateOperatingCost(helicopter),
          totalCost: calculateTotalCost(helicopter),
        }));

      setHelicopters(helicoptersWithCost);
    }
  };

  const handleFileChange = (file: File) => {
    setCsvFile(file);
    hasParsed.current = false;
  };

  const handelOperatingCost = () => {
    if (helicopters.length === 0) {
      return null;
    }

    let bestHelicopter = helicopters[0];
    let minOperatingCost = calculateOperatingCost(bestHelicopter);

    for (let i = 1; i < helicopters.length; i++) {
      const operatingCost = calculateOperatingCost(helicopters[i]);
      if (operatingCost < minOperatingCost) {
        minOperatingCost = operatingCost;
        bestHelicopter = helicopters[i];
      }
    }
    setBestHelicopter(bestHelicopter);
  };

  const handelTotalCost = () => {
    if (helicopters.length === 0) {
      return null;
    }

    let bestHelicopter = helicopters[0];
    let minTotalCost = calculateTotalCost(bestHelicopter);

    for (let i = 1; i < helicopters.length; i++) {
      const totalCost = calculateTotalCost(helicopters[i]);
      if (totalCost < minTotalCost) {
        minTotalCost = totalCost;
        bestHelicopter = helicopters[i];
      }
    }
    setBestHelicopter(bestHelicopter);
  };

  return (
    <div className="Helicopter">
      <div className="view">
        <h1 className="company">Glacier Sightseeing Tours</h1>
        <h3 className="company-description">when the dream come true</h3>
        <div className="upload-file">
          <p>Select csv file to se the Helicopter offers</p>
          <FileUpload onFileChange={handleFileChange} />
          <CsvParser
            hasParsed={hasParsed}
            file={csvFile}
            onParse={handleParse}
          />
        </div>
      </div>
      {csvFile ? (
        helicopters.length > 0 ? (
          <>
            <HelicopterList helicopters={helicopters} />
            <CustomButton
              color="primary"
              onClick={handelOperatingCost}
              label={"best Operating Cost"}
            />
            <CustomButton
              color="primary"
              onClick={handelTotalCost}
              label={"best total Cost"}
            />
            <div className="best-helicopter">
              <p>{bestHelicopter?.Name}</p>
              <p>{bestHelicopter?.OperatingCost}</p>
              <p>{bestHelicopter?.totalCost}</p>
            </div>
          </>
        ) : (
          <p>There are no data to display</p>
        )
      ) : (
        <p> Please select a CSV file to se data</p>
      )}
    </div>
  );
};

export default Helicopter;

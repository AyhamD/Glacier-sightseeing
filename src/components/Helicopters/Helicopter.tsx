import React, { useState } from "react";
import HelicopterList from "./HelicopterList/HelicopterList";
import FileUpload from "../../shared/files/FileUpload";
import CsvParser from "../../shared/files/CsvParser";
import "./Helicopter.css";

interface Helicopter {
  Name: string;
  Type: string;
  Quantity: number;
  "Price ($)": string;
  "Failure rate (1/year)": number;
  Description: string;
  Parent: string;
}

const Helicopter = () => {
  const [helicopters, setHelicopters] = useState<Helicopter[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleParse = (data: Helicopter[]) => {
    if (data && data.length > 0) {
      setHelicopters(data);
    }
  };

  const handleFileChange = (file: File) => {
    setCsvFile(file);
  };

  return (
    <div className="Helicopter">
      <div className="view">
        <h1 className="company">Glacier Sightseeing Tours</h1>
        <h3 className="company-description">when the dream come true</h3>
        <div className="upload-file">
          <p>Select csv file to se the Helicopter offers</p>
          <FileUpload onFileChange={handleFileChange} />
          <CsvParser file={csvFile} onParse={handleParse} />
        </div>
      </div>
      {csvFile ? (
        helicopters.length > 0 ? (
          <>
            <HelicopterList helicopters={helicopters} />
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

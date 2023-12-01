import React from "react";
import Helicopter from "../../components/Helicopters/Helicopter";

interface TableProps {
  headers: string[];
  column?: string[];
  body: Helicopter[];
}

const Table = ({ headers, body, column = headers }: TableProps) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.length > 0
            ? body.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {column.map((header, colIndex) => (
                    <td key={colIndex}>
                      {row[header] !== "" ? row[header] : "No value"}
                    </td>
                  ))}
                </tr>
              ))
            : "the file are empty"}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

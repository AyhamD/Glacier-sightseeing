import React, { useState } from "react";
import Helicopter from "../../components/Helicopters/Helicopter";

interface TableProps {
  headers: string[];
  column?: string[];
  body: Helicopter[];
}

const Table = ({ headers, body, column }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const paginatedBody = paginate(body);

  const totalPages = Math.ceil(body.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          {paginatedBody.length > 0
            ? paginatedBody.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {column
                    ? column.map((header, colIndex) => (
                        <td key={colIndex}>
                          {row[header] !== "" ? row[header] : "No value"}
                        </td>
                      ))
                    : headers.map((header, colIndex) => (
                        <td key={colIndex}>
                          {row[header] !== "" ? row[header] : "No value"}
                        </td>
                      ))}
                </tr>
              ))
            : "the file are empty"}
        </tbody>
      </table>
      <div>
        {body.length > itemsPerPage &&
          Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Table;

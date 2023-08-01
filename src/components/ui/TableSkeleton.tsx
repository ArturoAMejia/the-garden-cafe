import {
  TableRow,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import React from "react";

const TableSkeleton = ({ numRows }) => {
  // Helper function to generate an array of numbers
  const range = (start, end) =>
    Array.from({ length: end - start }, (_, i) => start + i);

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="bg-gray-200 p-2"></TableHeaderCell>
          <th className="bg-gray-200 p-2"></th>
          {/* Add more table header cells as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        {range(0, numRows).map((index) => (
          <TableRow key={index} className="animate-pulse">
            <TableCell className="border border-gray-300 p-2"></TableCell>
            <TableCell className="border border-gray-300 p-2"></TableCell>
            {/* Add more table data cells as needed */}
          </TableRow>
        ))}
      </TableBody>
    </table>
  );
};

export default TableSkeleton;

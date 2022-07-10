import React from "react";

const TableHeader = (props) => {
  const { columns, onSort } = props;
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => onSort(column.path)}
            style={{ cursor: "pointer" }}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

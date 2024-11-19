// Imports React and a CSS file for component-specific styling.
import React from "react";
import "./components-styles.css";

function Table(props) {
  // Destructures columns, data, and renderCustomCell from props. These are provided by the parent component.
  const { columns, data, renderCustomCell } = props;

  return (
    <table className="single-table-container" border={1}>
      {/* Table header section with column names */}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th> // Renders a header cell for each column.
          ))}
          {/* Adds an extra header cell if renderCustomCell is provided, used for special features like checkboxes */}
          {renderCustomCell && <th>Select Tickets:</th>}
        </tr>
      </thead>
      {/* Table body section with row data */}
      <tbody>
        {/* Maps over each row in the data array */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {/* Maps over columns to display each cell's data for the current row */}
            {columns.map((column) => (
              <td key={column.key}>{`${row[column.key]}`}</td>
            ))}
            {/* Renders custom content (like checkboxes) if renderCustomCell is provided */}
            {renderCustomCell && <td>{renderCustomCell(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

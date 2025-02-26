import { Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";

const TableComponent = ({ widget }) => {
  const [tableData, setTableData] = useState(
    widget.content || {
      columns: ["Column 1", "Column 2"],
      rows: [
        ["Row 1 Col 1", "Row 1 Col 2"],
        ["Row 2 Col 1", "Row 2 Col 2"],
      ],
    }
  );

  const addRow = () => {
    setTableData((prev) => ({
      ...prev,
      rows: [...prev.rows, new Array(prev.columns.length).fill("New Row")],
    }));
  };

  const addColumn = () => {
    setTableData((prev) => ({
      columns: [...prev.columns, `Column ${prev.columns.length + 1}`],
      rows: prev.rows.map((row) => [...row, "New Col"]),
    }));
  };

  const removeRow = (index) => {
    if (tableData.rows.length > 1) {
      setTableData((prev) => ({
        ...prev,
        rows: prev.rows.filter((_, i) => i !== index),
      }));
    }
  };

  const removeColumn = (index) => {
    if (tableData.columns.length > 1) {
      setTableData((prev) => ({
        columns: prev.columns.filter((_, i) => i !== index),
        rows: prev.rows.map((row) => row.filter((_, i) => i !== index)),
      }));
    }
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    setTableData((prev) => {
      const updatedRows = [...prev.rows];
      updatedRows[rowIndex][colIndex] = value;
      return { ...prev, rows: updatedRows };
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-lg border border-gray-300">
      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
          onClick={addRow}
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
        <button
          className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition"
          onClick={addColumn}
        >
          <Plus className="w-4 h-4" /> Add Column
        </button>
      </div>

      {/* Scrollable Container */}
      <div className="overflow-x-auto">
        <table className="border-collapse bg-white shadow-md rounded-lg min-w-[600px]">
          <thead>
            <tr className="bg-gray-200 text-gray-700 border-b border-gray-300">
              {tableData.columns.map((col, colIndex) => (
                <th key={colIndex} className="p-3 min-w-[150px] border border-gray-300 relative">
                  {col}
                  {tableData.columns.length > 1 && (
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                      onClick={() => removeColumn(colIndex)}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </th>
              ))}
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition`}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3 min-w-[150px] border border-gray-300">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                ))}
                <td className="p-3 border border-gray-300 text-center">
                  {tableData.rows.length > 1 && (
                    <button
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                      onClick={() => removeRow(rowIndex)}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;

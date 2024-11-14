import React from "react";

const BoardStep = ({ board }) => {
  if (!Array.isArray(board)) {
    return <div>Error: Invalid board data</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className={`flex items-center justify-center w-12 h-12 border ${
              cell === null ? "bg-gray-200 rounded-sm" : "bg-white rounded-sm"
            }`}
          >
            {cell !== null ? cell : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default BoardStep;

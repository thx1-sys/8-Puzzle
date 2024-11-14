import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Board = ({ board, moveTile }) => {
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    if (selectedTile !== null) {
      const timer = setTimeout(() => {
        setSelectedTile(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedTile]);

  const isValidMove = (index) => {
    const flatBoard = board.flat();
    const emptyIndex = flatBoard.indexOf(null);
    const validMoves = [
      emptyIndex - 1, // left
      emptyIndex + 1, // right
      emptyIndex - 3, // up
      emptyIndex + 3, // down
    ];
    return validMoves.includes(index);
  };

  const handleClick = (index) => {
    if (isValidMove(index)) {
      moveTile(index);
      setSelectedTile(null);
    } else {
      setSelectedTile(index);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-56 h-56 mb-4 ">
      <AnimatePresence>
        {board.flat().map((tile, index) => (
          <motion.div
            key={index}
            className={`board-item flex items-center justify-center aspect-square rounded-md ${
              tile === null ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => handleClick(index)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: selectedTile === index ? [0, -5, 5, -5, 5, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor:
                selectedTile === index
                  ? "#ff0000"
                  : tile === null
                  ? "#ffffff"
                  : "#e2e8f0",
              color: selectedTile === index ? "#ffffff" : "#000000",
            }}
          >
            {tile !== null ? tile : ""}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Board;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SolutionAnimation = ({ solutionSteps, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < solutionSteps.length - 1) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          return prevStep;
        }
      });
    }, 1000); // Cambia el paso cada segundo

    return () => clearInterval(interval);
  }, [solutionSteps]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative grid grid-cols-3 gap-2 w-48 h-48 mb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 right-0 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <AnimatePresence>
          {Array.isArray(solutionSteps[currentStep]) &&
          solutionSteps[currentStep].length === 3 &&
          solutionSteps[currentStep].every(
            (row) => Array.isArray(row) && row.length === 3
          ) ? (
            solutionSteps[currentStep].flat().map((tile, index) => (
              <motion.div
                key={index}
                className={`board-item flex items-center justify-center bg-gray-200 aspect-square ${
                  tile === null ? "bg-white" : ""
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {tile !== null ? tile : ""}
              </motion.div>
            ))
          ) : (
            <div className="text-white">Invalid step data</div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SolutionAnimation;

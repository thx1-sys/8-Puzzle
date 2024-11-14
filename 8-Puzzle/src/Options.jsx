import React, { useState } from "react";

const Options = ({
  customBoard,
  handleCustomBoardChange,
  applyCustomBoard,
  generateRandomBoard,
  solveBoard, // Recibe la función solveBoard como prop
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("aStar");

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <div className="title text-lg font-extralight mb-2 mt-4 text-gray-500">
        Opciones
      </div>
      <div>
        <button
          className="w-full mb-2 bg-[#687EFF] text-white py-4 px-4 rounded transition-all duration-500 hover:shadow-[0_15px_50px_-15px_#687EFF] flex items-center justify-center"
          onClick={generateRandomBoard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-dice mx-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.833 12a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm0 -7a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z" />
          </svg>
          Aleatorio
        </button>
        <button
          className="w-full mb-2 bg-[#6528F7] text-white py-4 px-4 rounded transition-all duration-500 hover:shadow-[0_15px_50px_-15px_#6528F7] flex items-center justify-center"
          onClick={applyCustomBoard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-adjustments mx-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 3a1 1 0 0 1 .993 .883l.007 .117v3.171a3.001 3.001 0 0 1 0 5.658v7.171a1 1 0 0 1 -1.993 .117l-.007 -.117v-7.17a3.002 3.002 0 0 1 -1.995 -2.654l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-3.17a1 1 0 0 1 1 -1z" />
            <path d="M12 3a1 1 0 0 1 .993 .883l.007 .117v9.171a3.001 3.001 0 0 1 0 5.658v1.171a1 1 0 0 1 -1.993 .117l-.007 -.117v-1.17a3.002 3.002 0 0 1 -1.995 -2.654l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-9.17a1 1 0 0 1 1 -1z" />
            <path d="M18 3a1 1 0 0 1 .993 .883l.007 .117v.171a3.001 3.001 0 0 1 0 5.658v10.171a1 1 0 0 1 -1.993 .117l-.007 -.117v-10.17a3.002 3.002 0 0 1 -1.995 -2.654l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-.17a1 1 0 0 1 1 -1z" />
          </svg>
          Personalizado
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-light text-gray-700 text-sm">
          Estado Personalizado (separado por comas, use "null" para el espacio
          vacío):
        </label>
        <input
          type="text"
          value={customBoard}
          onChange={handleCustomBoardChange}
          className="w-full bg-white border-2 border-gray-300 rounded-lg text-gray-700 px-6 py-3 text-base hover:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
      <div className="heading text-lg font-light text-gray-600 mb-2">
        Buscar
      </div>
      <div className="content mb-4">
        <div className="mb-4">
          <label className="block mb-2 font-light text-gray-700 text-sm">
            Algoritmo
          </label>
          <select
            className="w-full bg-white border-2 border-gray-300 rounded-lg text-gray-700 px-6 py-3 text-base hover:border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
            value={selectedAlgorithm}
            onChange={handleAlgorithmChange}
          >
            <option value="breadthFirst">Breadth-First</option>
            <option value="uniformCost">Uniform-Cost</option>
            <option value="depthFirst">Depth-First</option>
            <option value="iterativeDeepening">Iterative-Deepening</option>
            <option value="greedyBest">Greedy-Best</option>
            <option value="aStar">A*</option>
          </select>
        </div>

        <div className="flex justify-center space-x-2 w-full items-center mt-2">
          {/* <button
            aria-label="Start Game"
            className="px-8 py-2 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform bg-gray-300 border-2 border-white hover:scale-105 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none"
            onClick={solveBoard}
          >
            <span role="img" aria-label="step" className="text-xl">
              Start Game
            </span>
          </button> */}
          <div className="flex justify-center w-full">
            <button
              className="w-full cursor-pointer transition-all duration-500 hover:shadow-[0_15px_50px_-15px_#13b6da] p-[12px] rounded-[24px] flex items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-green-600"
              onClick={solveBoard}
            >
              <svg
                className="h-12 w-12 bg-[#0a0a0a] shadow-xl rounded-full p-3"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.003 14H3.5v-4h11.502l-4.165-4.538 2.705-2.947 7.353 8.012c.747.813.747 2.133 0 2.947l-7.353 8.011-2.705-2.947L15.003 14z"
                  fill="#F0F0F0"
                ></path>
              </svg>
              <span className="text-[1.9rem] font-bold text-white pr-3">
                Iniciar
              </span>
            </button>
          </div>
          {/* <button className="bg-red-500 text-white p-2 rounded flex items-center justify-center flex-1">
            <span role="img" aria-label="stop" className="text-xl">
              ⏹️
            </span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Options;

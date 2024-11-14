import { useState, useRef } from "react";
import axios from "axios";
import Board from "./Board";
import Options from "./Options";
import SearchResult from "./SearchResult";
import Graph from "./Graph";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const initialBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null],
  ];
  const [board, setBoard] = useState(initialBoard);
  const [originalBoard, setOriginalBoard] = useState(initialBoard); // Nuevo estado para guardar el tablero original
  const [customBoard, setCustomBoard] = useState(
    initialBoard
      .flat()
      .map((item) => (item === null ? "null" : item))
      .join(",")
  );
  const [solutionInfo, setSolutionInfo] = useState({});
  const [isSolutionFound, setIsSolutionFound] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [executionInfo, setExecutionInfo] = useState({}); // Nuevo estado para la información de ejecución
  const networkRef = useRef(null);

  const moveTile = (index) => {
    const flatBoard = board.flat();
    const emptyIndex = flatBoard.indexOf(null);
    const validMoves = [
      emptyIndex - 1, // left
      emptyIndex + 1, // right
      emptyIndex - 3, // up
      emptyIndex + 3, // down
    ];
    if (validMoves.includes(index)) {
      const newBoard = [...flatBoard];
      [newBoard[emptyIndex], newBoard[index]] = [
        newBoard[index],
        newBoard[emptyIndex],
      ];
      setBoard([
        newBoard.slice(0, 3),
        newBoard.slice(3, 6),
        newBoard.slice(6, 9),
      ]);
    }
  };

  const handleCustomBoardChange = (e) => {
    setCustomBoard(e.target.value);
  };

  const applyCustomBoard = async () => {
    const newBoard = customBoard
      .split(",")
      .map((item) =>
        item.trim() === "null" ? null : parseInt(item.trim(), 10)
      );
    const isValidBoard =
      newBoard.length === 9 &&
      newBoard.filter((item) => item === null).length === 1 &&
      newBoard.filter((item) => item !== null && item >= 1 && item <= 8)
        .length === 8;
    if (isValidBoard) {
      setBoard([
        newBoard.slice(0, 3),
        newBoard.slice(3, 6),
        newBoard.slice(6, 9),
      ]);
      await solveBoard(); // Llama a solveBoard después de aplicar el tablero personalizado
    } else {
      alert(
        "El tablero personalizado debe contener exactamente los números del 1 al 8 y un espacio vacío representado por 'null'."
      );
    }
  };

  const solveBoard = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api", {
        board: board.map((row) =>
          row.map((cell) => (cell === null ? 0 : cell))
        ),
      });
      const data = response.data;
      setSolutionInfo(data.solutionInfo);
      setSolutionSteps(data.solution); // Asegúrate de usar la clave correcta
      setGraph(data.graph);
      setExecutionInfo(data); // Actualiza el estado con la información de ejecución
      setIsSolutionFound(true);
    } catch (error) {
      console.error("Error al resolver el tablero:", error);
      alert("Error al resolver el tablero");
    }
  };

  const isSolvable = (board) => {
    const flatBoard = board.flat().filter((num) => num !== null);
    let inversions = 0;
    for (let i = 0; i < flatBoard.length - 1; i++) {
      for (let j = i + 1; j < flatBoard.length; j++) {
        if (flatBoard[i] > flatBoard[j]) inversions++;
      }
    }
    return inversions % 2 === 0;
  };

  const generateRandomBoard = () => {
    let newBoard;
    do {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, null];
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      newBoard = [
        numbers.slice(0, 3),
        numbers.slice(3, 6),
        numbers.slice(6, 9),
      ];
    } while (!isSolvable(newBoard));
    setBoard(newBoard);
  };

  const handleNodeClick = (nodeId) => {
    const node = graph.nodes.find((n) => n.id === nodeId);
    if (node) {
      const newBoard = node.label
        .split("\n")
        .map((row) =>
          row
            .split(" ")
            .map((cell) => (cell === "0" ? null : parseInt(cell, 10)))
        );
      setBoard(newBoard);
    }
  };

  const playSolutionSteps = async () => {
    setOriginalBoard(board); // Guarda el estado original del tablero
    for (const step of solutionSteps) {
      const newBoard = step
        .trim()
        .split("\n")
        .map((row) =>
          row
            .trim()
            .split(/\s+/)
            .map((cell) => (cell === "0" ? null : parseInt(cell, 10)))
        );
      setBoard(newBoard);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1 segundo entre pasos
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-5 gap-4">
      <div className="grid items-center justify-center col-span-1 px-4 h-full overflow-auto">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-extrabold mb-8">8 PUZZLE</h1>
          <Board board={board} moveTile={moveTile} />
          <Options
            customBoard={customBoard}
            handleCustomBoardChange={handleCustomBoardChange}
            applyCustomBoard={applyCustomBoard}
            generateRandomBoard={generateRandomBoard}
            solveBoard={solveBoard} // Pasa la función solveBoard como prop
          />
          <SearchResult solutionInfo={solutionInfo} />
          {executionInfo && (
            <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-white p-4 rounded-lg shadow-lg w-4/12 mb-4 pointer-events-auto">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-s font-medium">
                    Información de Ejecución:
                  </h2>
                  <button
                    className="text-red-500"
                    onClick={() => setExecutionInfo(null)}
                  >
                    x
                  </button>
                </div>
                <table className="w-full text-left text-sm font-light">
                  <tbody>
                    <tr>
                      <th className="pr-4 font-light text-gray-600 text-sm">
                        Iteraciones:
                      </th>
                      <td className="text-sm font-extralight text-gray-500">
                        {executionInfo.iterations}
                      </td>
                      <th className="pr-4 font-light text-gray-600 text-sm">
                        Tiempo:
                      </th>
                      <td className="text-sm font-extralight text-gray-500">
                        {executionInfo.time} ms
                      </td>
                    </tr>
                    <tr>
                      <th className="pr-4 font-light text-gray-600 text-sm">
                        Nodos Expandidos:
                      </th>
                      <td className="text-sm font-extralight text-gray-500">
                        {executionInfo.expanded_nodes}
                      </td>
                      <th className="pr-4 font-light text-gray-600 text-sm">
                        Nivel:
                      </th>
                      <td className="text-sm font-extralight text-gray-500">
                        {executionInfo.level}
                      </td>
                    </tr>
                    <tr>
                      <th className="pr-4 font-light text-gray-600 text-sm">
                        Mensaje:
                      </th>
                      <td className="text-sm font-extralight text-gray-500">
                        {executionInfo.message}
                      </td>
                      {/* <th className="pr-4 font-light text-gray-600 text-sm">
                        Nodos Restantes:
                      </th>
                      <td className="text-sm font-extralight text-gray-500">
                        {executionInfo.remaining_nodes}
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-3 bg-[#F5F7F8] h-full overflow-auto p-4 flex items-center justify-center">
        {showPuzzle ? (
          <div className="w-96 h-96 flex items-center justify-center">
            <Board board={board} moveTile={moveTile} />
          </div>
        ) : (
          <Graph
            networkRef={networkRef}
            graph={graph}
            onNodeClick={handleNodeClick}
          />
        )}
      </div>
      <div className="col-span-1 bg-white h-full overflow-auto p-4">
        {solutionSteps.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Pasos de la Solución:</h2>
            {solutionSteps.map((step, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-sm font-extralight mb-2">
                  Paso {index + 1}
                </h3>
                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-2 w-56 h-56 mb-4">
                    {step
                      .trim()
                      .split(/\s+/)
                      .map((num, idx) => (
                        <motion.div
                          key={idx}
                          className={`board-item flex items-center justify-center aspect-square rounded-md ${
                            num === "null" ? "bg-white" : "bg-gray-200"
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            backgroundColor:
                              num === "null" ? "#ffffff" : "#e2e8f0",
                            color: "#000000",
                          }}
                        >
                          {num !== "null" ? num : ""}
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => {
          if (showPuzzle) {
            setBoard(originalBoard); // Restaura el tablero original
          } else {
            playSolutionSteps();
          }
          setShowPuzzle(!showPuzzle);
        }}
      >
        {showPuzzle ? "Ver Grafo" : "Probar Puzzle"}
      </button>
    </div>
  );
}

export default App;

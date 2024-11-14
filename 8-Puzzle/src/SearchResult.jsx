import React from "react";

const SearchResult = ({ solutionInfo }) => {
  if (!solutionInfo || Object.keys(solutionInfo).length === 0) {
    return null; // No renderizar nada si no hay información
  }

  return (
    <div className="heading text-lg font-semibold mb-2">
      Resultado de la Búsqueda
      <div className="content p-4 border rounded">
        <p>Profundidad: {solutionInfo.depth}</p>
        <p>Iteración: {solutionInfo.iteration}</p>
        <p>Nodos expandidos: {solutionInfo.expandedNodes}</p>
        <p>Nodos en la frontera: {solutionInfo.frontierNodes}</p>
      </div>
    </div>
  );
};

export default SearchResult;

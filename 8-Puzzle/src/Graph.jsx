import React, { useEffect, useState } from "react";
import { Network } from "vis-network/standalone";

const Graph = ({ networkRef, graph, onNodeClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (networkRef.current && graph.nodes.length > 0) {
      const container = networkRef.current;
      const lastIndex = graph.nodes.length - 1;
      const data = {
        nodes: graph.nodes.map((node, index) => ({
          ...node,
          color:
            index === 0
              ? { background: "#FF8000", border: "none" }
              : index === lastIndex
              ? { background: "#6A9C89", border: "none" }
              : node.color,
          font: {
            color:
              index === 0
                ? "#FFFFFF"
                : node.color === "#F5F7F8"
                ? "#000000"
                : "#FFFFFF",
          },
        })),
        edges: graph.edges.map((edge) => ({
          ...edge,
          color: "#A6AEBF",
        })),
      };
      const options = {
        layout: {
          improvedLayout: true,
        },
        interaction: { dragNodes: true },
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -8000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0.5,
          },
          solver: "barnesHut",
          stabilization: {
            enabled: true,
            iterations: 50,
            updateInterval: 5,
            onlyDynamicEdges: false,
            fit: true,
          },
          minVelocity: 0.75,
          maxVelocity: 2,
        },
      };

      const network = new Network(container, data, options);
      network.on("stabilizationIterationsDone", () => {
        setLoading(false);
        network.setOptions({ physics: { enabled: true } });
      });

      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          console.log("Node clicked:", params.nodes[0]);
          onNodeClick(params.nodes[0]);
        }
      });

      network.stabilize();
    }
  }, [networkRef, graph, onNodeClick]);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <div className="loop cubes">
            <div className="item cubes"></div>
            <div className="item cubes"></div>
            <div className="item cubes"></div>
            <div className="item cubes"></div>
            <div className="item cubes"></div>
            <div className="item cubes"></div>
          </div>
        </div>
      )}
      <div ref={networkRef} style={{ height: "100%" }}></div>
    </div>
  );
};

export default Graph;

// import React, { useEffect, useState } from "react";
// import { Network } from "vis-network/standalone";

// const Graph = ({ networkRef, graph }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (networkRef.current && graph.nodes.length > 0) {
//       const container = networkRef.current;
//       const data = {
//         nodes: graph.nodes.map((node, index) => ({
//           ...node,
//           color:
//             index === 0
//               ? { background: "#CDC1FF", border: "none" }
//               : node.color,
//         })),
//         edges: graph.edges.map((edge) => ({
//           ...edge,
//           color: "#A6AEBF",
//         })),
//       };
//       const options = {
//         layout: {
//           hierarchical: {
//             direction: "UD", // Up-Down direction
//             sortMethod: "directed",
//             levelSeparation: 150,
//             nodeSpacing: 100,
//             treeSpacing: 200,
//             blockShifting: true,
//             edgeMinimization: true,
//             parentCentralization: true,
//           },
//         },
//         interaction: { dragNodes: false },
//         physics: {
//           enabled: true,
//           hierarchicalRepulsion: {
//             nodeDistance: 200,
//             centralGravity: 0.0,
//             springLength: 200,
//             springConstant: 0.01,
//             damping: 0.09,
//           },
//           solver: "hierarchicalRepulsion",
//           stabilization: {
//             enabled: true,
//             iterations: 3000,
//             updateInterval: 25,
//             onlyDynamicEdges: false,
//             fit: true,
//           },
//         },
//       };

//       const network = new Network(container, data, options);
//       network.on("stabilizationIterationsDone", () => {
//         setLoading(false);
//         network.setOptions({ physics: false });
//       });

//       network.on("click", (params) => {
//         if (params.nodes.length > 0) {
//           console.log("Node clicked:", params.nodes[0]);
//         }
//       });

//       network.stabilize();
//     }
//   }, [networkRef, graph]);

//   return (
//     <div style={{ position: "relative", height: "100%" }}>
//       {loading && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "rgba(255, 255, 255, 0.8)",
//             padding: "10px",
//             borderRadius: "5px",
//             zIndex: 1,
//           }}
//         >
//           Cargando...
//         </div>
//       )}
//       <div ref={networkRef} style={{ height: "100%" }}></div>
//     </div>
//   );
// };

// export default Graph;

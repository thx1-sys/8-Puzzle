const bfsSolve = async () => {
    // Implementación del algoritmo Breadth-First Search
    const bfs = (graph, startNode) => {
        let visited = new Set();
        let queue = [startNode];
        let result = [];

        while (queue.length > 0) {
            let currentNode = queue.shift();
            if (!visited.has(currentNode)) {
                visited.add(currentNode);
                result.push(currentNode);

                let neighbors = graph[currentNode];
                for (let neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
        return result;
    };

    // Example usage
    const graph = {
        0: [1, 2],
        1: [0, 3, 4],
        2: [0, 5, 6],
        3: [1],
        4: [1],
        5: [2],
        6: [2]
    };

    const startNode = 0;
    const result = bfs(graph, startNode);
    console.log(result);
};

bfsSolve();
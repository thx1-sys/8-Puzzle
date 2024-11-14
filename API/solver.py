import heapq

# Definir el estado objetivo
GOAL_STATE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]

def find_zero_position(board):
    for i, row in enumerate(board):
        for j, value in enumerate(row):
            if value == 0:
                return i, j

# Realiza un movimiento en el tablero si es válido
def move(board, direction):
    x, y = find_zero_position(board)
    new_board = [row[:] for row in board]  # Copia de la matriz
    if direction == 'up' and x > 0:
        new_board[x][y], new_board[x - 1][y] = new_board[x - 1][y], new_board[x][y]
    elif direction == 'down' and x < 2:
        new_board[x][y], new_board[x + 1][y] = new_board[x + 1][y], new_board[x][y]
    elif direction == 'left' and y > 0:
        new_board[x][y], new_board[x][y - 1] = new_board[x][y - 1], new_board[x][y]
    elif direction == 'right' and y < 2:
        new_board[x][y], new_board[x][y + 1] = new_board[x][y + 1], new_board[x][y]
    else:
        return None  # Movimiento no válido
    return new_board

# Función heurística h(X): calcula la distancia de Manhattan
def manhattan_distance(board):
    distance = 0
    for i in range(3):
        for j in range(3):
            if board[i][j] != 0:
                # Buscar la posición objetivo de la ficha en GOAL_STATE
                target_x, target_y = next(
                    (x, y) for x, row in enumerate(GOAL_STATE) for y, value in enumerate(row) if value == board[i][j]
                )
                distance += abs(target_x - i) + abs(target_y - j)
    return distance

# Verifica si el tablero es resoluble
def is_solvable(board):
    flat_board = [num for row in board for num in row if num != 0]
    inversions = sum(
        1 for i in range(len(flat_board)) for j in range(i + 1, len(flat_board)) if flat_board[i] > flat_board[j]
    )
    return inversions % 2 == 0

# Convierte el tablero a una cadena para usarla como etiqueta en el grafo
def board_to_str(board):
    return '\n'.join([' '.join(map(str, row)) for row in board])

# Imprime el tablero de manera legible
def print_board(board):
    return '\n'.join([' '.join(f'{num:2}' for num in row) for row in board])

# Método A* que encuentra la solución más corta
def a_star(board, max_iterations=1000):
    if not is_solvable(board):
        return "El tablero inicial no es resoluble.", [], {"nodes": [], "edges": []}, 0, 0, 0, 0

    priority_queue = []
    heapq.heappush(priority_queue, (0, board, [], 0))  # (costo, tablero, ruta, nivel)
    visited = set()
    visited.add(str(board))

    nodes = []
    edges = []
    node_id = 0
    board_to_id = {str(board): node_id}
    nodes.append({"id": node_id, "label": board_to_str(board), "level": 0, "color": "#F5F7F8"})
    node_id += 1

    iterations = 0
    expanded_nodes = 0

    while priority_queue:
        if iterations >= max_iterations:
            return "Se alcanzó el límite de iteraciones.", [], {"nodes": nodes, "edges": edges}, 0, iterations, expanded_nodes, len(priority_queue)

        cost, current_board, path, level = heapq.heappop(priority_queue)
        iterations += 1

        # Verificar si es el estado objetivo
        if current_board == GOAL_STATE:
            for i in range(len(path)):
                edges.append({"from": board_to_id[str(path[i][0])], "to": board_to_id[str(path[i][1])], "color": "green"})
                nodes[board_to_id[str(path[i][1])]]["color"] = "#222831"
            return "Estado objetivo alcanzado!", [print_board(step[1]) for step in path] + [print_board(current_board)], {"nodes": nodes, "edges": edges}, level, iterations, expanded_nodes, len(priority_queue)

        # Expandir nodos
        for direction in ['up', 'down', 'left', 'right']:
            new_board = move(current_board, direction)
            if new_board and str(new_board) not in visited:
                g_x = len(path) + 1  # Número de movimientos realizados hasta ahora
                h_x = manhattan_distance(new_board)  # Heurística: distancia de Manhattan
                f_x = g_x + h_x
                heapq.heappush(priority_queue, (f_x, new_board, path + [(current_board, new_board)], level + 1))
                visited.add(str(new_board))
                board_to_id[str(new_board)] = node_id
                nodes.append({"id": node_id, "label": board_to_str(new_board), "level": level + 1, "color": "#F5F7F8"})
                edges.append({"from": board_to_id[str(current_board)], "to": node_id})
                node_id += 1
                expanded_nodes += 1

    return "No se encontró solución.", [], {"nodes": nodes, "edges": edges}, 0, iterations, expanded_nodes, len(priority_queue)
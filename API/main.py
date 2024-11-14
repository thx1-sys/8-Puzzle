from flask import Flask, jsonify, request
from flask_cors import CORS
from solver import is_solvable, a_star

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

@app.route('/api/is_solvable', methods=['POST'])
def check_solvable():
    data = request.get_json()
    board = data['board']
    return jsonify({'isSolvable': is_solvable(board)})

@app.route('/api', methods=['POST'])
def solve():
    data = request.get_json()
    board = data.get('board')
    max_iterations = data.get('max_iterations', 10000)  # Valor por defecto de 1000 iteraciones

    if board is None:
        return jsonify({"error": "No board provided"}), 400

    message, solution, graph, level, iterations, expanded_nodes, remaining_nodes = a_star(board, max_iterations)
    return jsonify({
        "message": message,
        "solution": solution,
        "graph": graph,
        "level": level,
        "iterations": iterations,
        "expanded_nodes": expanded_nodes,
        "remaining_nodes": remaining_nodes
    })

if __name__ == '__main__':
    app.run(debug=True)
# 8-Puzzle

## Instalación

### Backend

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/8-puzzle-solver.git
    cd 8-puzzle-solver/API
    ```

2. Crea y activa un entorno virtual:
    ```sh
    python3 -m venv myenv
    source myenv/bin/activate  # En Windows usa `myenv\Scripts\activate`
    ```

3. Instala las dependencias:
    ```sh
    pip install -r requirements.txt
    ```

4. Ejecuta el servidor Flask:
    ```sh
    python main.py
    ```

### Frontend

1. Navega al directorio del frontend:
    ```sh
    cd ../8-Puzzle
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Ejecuta la aplicación en modo desarrollo:
    ```sh
    npm run dev
    ```

## Uso

1. Abre tu navegador y navega a `http://localhost:3000`.
2. Interactúa con la interfaz para generar un tablero aleatorio, aplicar un tablero personalizado o resolver el tablero actual.
3. La solución se mostrará paso a paso en el tablero.

## API

### `/api/is_solvable`

- **Método:** `POST`
- **Descripción:** Verifica si el tablero es resoluble.
- **Cuerpo de la solicitud:**
    ```json
    {
        "board": [[1, 2, 3], [4, 5, 6], [7, 8, null]]
    }
    ```
- **Respuesta:**
    ```json
    {
        "isSolvable": true
    }
    ```

### `/api`

- **Método:** `POST`
- **Descripción:** Resuelve el tablero utilizando el algoritmo A*.
- **Cuerpo de la solicitud:**
    ```json
    {
        "board": [[1, 2, 3], [4, 5, 6], [7, 8, null]],
        "max_iterations": 10000
    }
    ```
- **Respuesta:**
    ```json
    {
        "message": "Estado objetivo alcanzado!",
        "solution": ["1 2 3\n4 8 5\n0 7 6", ...],
        "graph": { "nodes": [...], "edges": [...] },
        "level": 5,
        "iterations": 6,
        "expanded_nodes": 11,
        "remaining_nodes": 6
    }
    ```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

// js/matrix-operations.js

/**
 * Valida si una matriz es cuadrada.
 * @param {number[][]} matrix
 * @returns {boolean}
 */
export function isSquareMatrix(matrix) {
    if (!matrix || matrix.length === 0) return false;
    const rows = matrix.length;
    for (let i = 0; i < rows; i++) {
        if (!matrix[i] || matrix[i].length !== rows) return false;
    }
    return true;
}

/**
 * Valida si dos matrices tienen las mismas dimensiones.
 * @param {number[][]} matrixA
 * @param {number[][]} matrixB
 * @returns {boolean}
 */
export function haveSameDimensions(matrixA, matrixB) {
    if (!matrixA || !matrixB || matrixA.length === 0 || matrixB.length === 0) {
        return false;
    }
    if (matrixA.length !== matrixB.length) return false;
    for (let i = 0; i < matrixA.length; i++) {
        if (matrixA[i].length !== matrixB[i].length) return false;
    }
    return true;
}

/**
 * Valida si dos matrices son multiplicables (columnas de A = filas de B).
 * @param {number[][]} matrixA
 * @param {number[][]} matrixB
 * @returns {boolean}
 */
export function areMultipliable(matrixA, matrixB) {
    if (!matrixA || !matrixB || matrixA.length === 0 || matrixB.length === 0) {
        return false;
    }
    // Columnas de A deben ser iguales a las filas de B
    return matrixA[0].length === matrixB.length;
}

/**
 * Crea una matriz con las dimensiones dadas, inicializada a cero.
 * @param {number} rows
 * @param {number} cols
 * @returns {number[][]}
 */
function createZeroMatrix(rows, cols) {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
}

/**
 * Realiza la suma de dos matrices.
 * @param {number[][]} matrixA
 * @param {number[][]} matrixB
 * @returns {number[][]} Nueva matriz resultado
 * @throws {Error} Si las dimensiones no coinciden.
 */
export function addMatrices(matrixA, matrixB) {
    if (!haveSameDimensions(matrixA, matrixB)) {
        throw new Error("Las matrices deben tener las mismas dimensiones para la suma.");
    }
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = createZeroMatrix(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    return result;
}

/**
 * Realiza la resta de dos matrices (matrixA - matrixB).
 * @param {number[][]} matrixA
 * @param {number[][]} matrixB
 * @returns {number[][]} Nueva matriz resultado
 * @throws {Error} Si las dimensiones no coinciden.
 */
export function subtractMatrices(matrixA, matrixB) {
    if (!haveSameDimensions(matrixA, matrixB)) {
        throw new Error("Las matrices deben tener las mismas dimensiones para la resta.");
    }
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = createZeroMatrix(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }
    return result;
}

/**
 * Realiza la multiplicación de dos matrices.
 * @param {number[][]} matrixA
 * @param {number[][]} matrixB
 * @returns {number[][]} Nueva matriz resultado
 * @throws {Error} Si las matrices no son compatibles para la multiplicación.
 */
export function multiplyMatrices(matrixA, matrixB) {
    if (!areMultipliable(matrixA, matrixB)) {
        throw new Error("Las matrices no son compatibles para la multiplicación. El número de columnas de la primera matriz debe ser igual al número de filas de la segunda.");
    }

    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    // const rowsB = matrixB.length; // Es igual a colsA por la validación
    const colsB = matrixB[0].length;

    const result = createZeroMatrix(rowsA, colsB);

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) { // colsA o rowsB, son lo mismo
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

/**
 * Realiza la multiplicación de una matriz por un escalar.
 * @param {number} scalar
 * @param {number[][]} matrix
 * @returns {number[][]} Nueva matriz resultado
 */
export function scalarMultiply(scalar, matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        throw new Error("La matriz no puede estar vacía para la multiplicación por escalar.");
    }
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = createZeroMatrix(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = scalar * matrix[i][j];
        }
    }
    return result;
}

/**
 * Calcula la transpuesta de una matriz.
 * @param {number[][]} matrix
 * @returns {number[][]} Nueva matriz transpuesta
 */
export function transposeMatrix(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        throw new Error("La matriz no puede estar vacía para la transposición.");
    }
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = createZeroMatrix(cols, rows); // Filas y columnas intercambiadas

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}

/**
 * Genera una matriz identidad de tamaño n.
 * @param {number} n Tamaño de la matriz (n x n)
 * @returns {number[][]} Matriz identidad
 * @throws {Error} Si n no es un número válido o fuera de rango.
 */
export function generateIdentityMatrix(n) {
    if (typeof n !== 'number' || n < 2 || n > 10 || !Number.isInteger(n)) {
        throw new Error("El tamaño de la matriz identidad debe ser un número entero entre 2 y 10.");
    }
    const identity = createZeroMatrix(n, n);
    for (let i = 0; i < n; i++) {
        identity[i][i] = 1;
    }
    return identity;
}

/**
 * Obtiene el cofactor (submatriz) para el cálculo del determinante/inversa.
 * @param {number[][]} matrix
 * @param {number} p Fila a excluir
 * @param {number} q Columna a excluir
 * @returns {number[][]} Submatriz
 */
function getCofactor(matrix, p, q) {
    const n = matrix.length;
    const temp = [];
    let i = 0, j = 0;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            // Copiar solo elementos que no están en la fila p ni en la columna q
            if (row !== p && col !== q) {
                if (j === (n - 1)) { // Si hemos llenado una fila de la submatriz
                    temp.push([]);
                    i++;
                    j = 0;
                }
                // Asegurarse de que el array interno exista antes de asignar
                if (!temp[i]) temp[i] = [];
                temp[i][j++] = matrix[row][col];
            }
        }
    }
    // Filtrar filas vacías o incompletas que podrían crearse si el tamaño de la matriz original era 1x1
    return temp.filter(row => row && row.length > 0);
}

/**
 * Calcular el determinante de una matriz cuadrada.
 * Usa expansión por cofactores.
 * @param {number[][]} matrix
 * @returns {number} El determinante de la matriz.
 * @throws {Error} Si la matriz no es cuadrada o está vacía.
 */
export function determinant(matrix) {
    if (!isSquareMatrix(matrix)) {
        throw new Error("La matriz debe ser cuadrada para calcular el determinante.");
    }
    if (matrix.length === 0) {
        return 0; // Determinante de una matriz vacía
    }

    const n = matrix.length;

    if (n === 1) {
        return matrix[0][0];
    }
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    // Recorrer la primera fila para la expansión por cofactores
    for (let j = 0; j < n; j++) {
        const cofactor = getCofactor(matrix, 0, j);
        const sign = (j % 2 === 0) ? 1 : -1;
        det += sign * matrix[0][j] * determinant(cofactor);
    }
    return det;
}

/**
 * Calcula la matriz adjunta de una matriz.
 * @param {number[][]} matrix
 * @returns {number[][]} Matriz adjunta
 * @throws {Error} Si la matriz no es cuadrada.
 */
function adjugate(matrix) {
    if (!isSquareMatrix(matrix)) {
        throw new Error("La matriz debe ser cuadrada para calcular la adjunta.");
    }
    const n = matrix.length;
    const adj = createZeroMatrix(n, n);

    if (n === 1) {
        adj[0][0] = 1;
        return adj;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cofactorMatrix = getCofactor(matrix, i, j);
            const sign = ((i + j) % 2 === 0) ? 1 : -1;
            adj[j][i] = sign * determinant(cofactorMatrix); // Transposición implícita
        }
    }
    return adj;
}

/**
 * Calcula la inversa de una matriz cuadrada.
 * @param {number[][]} matrix
 * @returns {number[][]} Matriz inversa
 * @throws {Error} Si la matriz no es cuadrada o si el determinante es cero.
 */
export function inverseMatrix(matrix) {
    if (!isSquareMatrix(matrix)) {
        throw new Error("La matriz debe ser cuadrada para calcular la inversa.");
    }
    const n = matrix.length;

    const det = determinant(matrix);
    if (Math.abs(det) < 1e-9) { // Usar una tolerancia para comparar con cero
        throw new Error("La matriz no es invertible porque su determinante es cero o muy cercano a cero.");
    }

    const adj = adjugate(matrix);
    const inv = createZeroMatrix(n, n);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            inv[i][j] = adj[i][j] / det;
        }
    }
    return inv;
}

// Ejemplo de verificación A * A^-1 = I
export function checkInverse(originalMatrix, inverseMatrixResult) {
    if (!isSquareMatrix(originalMatrix) || !isSquareMatrix(inverseMatrixResult) ||
        originalMatrix.length !== inverseMatrixResult.length) {
        throw new Error("Las matrices no son válidas para la verificación de inversa.");
    }
    return multiplyMatrices(originalMatrix, inverseMatrixResult);
}
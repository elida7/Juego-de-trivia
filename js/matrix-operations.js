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
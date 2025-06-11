// js/ui-handlers.js
import * as MatrixOperations from './matrix-operations.js';

// Referencias a elementos del DOM
const matrixSizeInput = document.getElementById('matrix-size');
const matrixAGrid = document.getElementById('matrixA-grid');
const matrixBGrid = document.getElementById('matrixB-grid');
const resultMatrixGrid = document.getElementById('resultMatrix-grid');
const scalarInput = document.getElementById('scalarInput');

const errorMessageDisplay = document.getElementById('errorMessage');
const successMessageDisplay = document.getElementById('successMessage');
const resultMatrixContainer = document.getElementById('resultMatrixContainer');
const additionalResultsDisplay = document.getElementById('additionalResults');

// Secciones que se mostrarán/ocultarán
const matrixInputArea = document.getElementById('matrix-input-area');
const operationsSection = document.getElementById('operations');
const resultsArea = document.getElementById('results-area');

// Almacenamiento de las matrices actuales en memoria (para reutilización)
let currentMatrixA = null;
let currentMatrixB = null;
let currentMatrixSize = 0;

/**
 * Muestra un mensaje al usuario (error o éxito).
 * @param {string} message
 * @param {boolean} isError True para error, false para éxito.
 */
export function displayMessage(message, isError) {
    hideMessages();
    if (isError) {
        errorMessageDisplay.innerHTML = `<strong>Error:</strong> ${message}`;
        errorMessageDisplay.style.display = 'block';
    } else {
        successMessageDisplay.innerHTML = `<strong>Éxito:</strong> ${message}`;
        successMessageDisplay.style.display = 'block';
    }
}

/**
 * Oculta todos los mensajes de error y éxito.
 */
export function hideMessages() {
    errorMessageDisplay.style.display = 'none';
    successMessageDisplay.style.display = 'none';
    errorMessageDisplay.textContent = '';
    successMessageDisplay.textContent = '';
}

/**
 * Lee los valores de una matriz desde un grid de inputs HTML.
 * @param {HTMLElement} gridElement El contenedor del grid.
 * @param {number} size El tamaño esperado de la matriz.
 * @returns {number[][]} La matriz de números.
 * @throws {Error} Si los valores no son numéricos o las dimensiones no coinciden.
 */
export function getMatrixValuesFromInputs(gridElement, size) {
    const inputs = gridElement.querySelectorAll('input[type="number"]');
    const matrix = [];
    let currentRow = [];
    let count = 0;

    if (inputs.length === 0 || inputs.length !== size * size) {
        throw new Error(`El número de elementos en la matriz no coincide con el tamaño ${size}x${size}.`);
    }

    for (const input of inputs) {
        const value = parseFloat(input.value);
        if (isNaN(value)) {
            throw new Error("Todos los campos de la matriz deben ser números válidos.");
        }
        currentRow.push(value);
        count++;
        if (count % size === 0) {
            matrix.push(currentRow);
            currentRow = [];
        }
    }
    return matrix;
}

/**
 * Muestra una matriz en un grid HTML. Puede ser un grid de inputs o solo para mostrar resultados.
 * @param {HTMLElement} gridElement El contenedor del grid.
 * @param {number[][]} matrix La matriz a mostrar.
 * @param {boolean} isInputGrid Si es un grid de entrada (editable) o solo para mostrar resultados (no editable).
 */
export function displayMatrix(gridElement, matrix, isInputGrid = true) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        gridElement.innerHTML = '<p>Matriz vacía o inválida.</p>';
        return;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    gridElement.style.gridTemplateColumns = `repeat(${cols}, minmax(60px, 1fr))`;
    gridElement.innerHTML = ''; // Limpiar contenido anterior

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement(isInputGrid ? 'input' : 'div');
            if (isInputGrid) {
                cell.type = 'number';
                cell.value = matrix[i][j];
            } else {
                // Redondear para evitar números flotantes muy largos en la UI
                const displayValue = Math.abs(matrix[i][j]) < 1e-9 ? 0 : matrix[i][j]; // Mostrar 0 si es muy cercano a cero
                cell.textContent = displayValue.toFixed(4);
                cell.classList.add('matrix-result-cell');
            }
            gridElement.appendChild(cell);
        }
    }
}

/**
 * Inicializa y muestra los grids de matrices A y B con inputs vacíos.
 */
export function createMatrices() {
    console.log("createMatrices function called."); // Debugging log
    hideMessages();
    additionalResultsDisplay.innerHTML = ''; // Limpiar resultados adicionales
    resultMatrixContainer.classList.add('hidden'); // Ocultar matriz resultado

    try {
        const size = parseInt(matrixSizeInput.value);
        if (isNaN(size) || size < 2 || size > 10) {
            throw new Error("El tamaño de la matriz debe ser un número entero entre 2 y 10.");
        }
        currentMatrixSize = size;
        currentMatrixA = Array(size).fill(0).map(() => Array(size).fill(0));
        currentMatrixB = Array(size).fill(0).map(() => Array(size).fill(0));

        displayMatrix(matrixAGrid, currentMatrixA, true);
        displayMatrix(matrixBGrid, currentMatrixB, true);

        // Mostrar las secciones ocultas
        matrixInputArea.classList.remove('hidden');
        operationsSection.classList.remove('hidden');
        resultsArea.classList.remove('hidden');

        displayMessage(`Matrices de ${size}x${size} creadas. ¡Ingresa los valores!`, false);

    } catch (error) {
        displayMessage(error.message, true);
        // Si hay un error, ocultar las secciones para evitar una interfaz incompleta
        matrixInputArea.classList.add('hidden');
        operationsSection.classList.add('hidden');
        resultsArea.classList.add('hidden');
    }
}

/**
 * Genera matrices A y B con valores aleatorios.
 */
export function randomizeMatrices() {
    hideMessages();
    additionalResultsDisplay.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');

    try {
        const size = parseInt(matrixSizeInput.value);
        if (isNaN(size) || size < 2 || size > 10) {
            throw new Error("El tamaño de la matriz debe ser un número entero entre 2 y 10.");
        }
        currentMatrixSize = size;
        currentMatrixA = generateRandomMatrixData(size);
        currentMatrixB = generateRandomMatrixData(size);

        displayMatrix(matrixAGrid, currentMatrixA, true);
        displayMatrix(matrixBGrid, currentMatrixB, true);

        matrixInputArea.classList.remove('hidden');
        operationsSection.classList.remove('hidden');
        resultsArea.classList.remove('hidden');

        displayMessage(`Matrices de ${size}x${size} generadas con valores aleatorios.`, false);
    } catch (error) {
        displayMessage(error.message, true);
    }
}

/**
 * Función auxiliar para generar datos de matriz aleatoria.
 * @param {number} size
 * @returns {number[][]}
 */
function generateRandomMatrixData(size) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(Math.floor(Math.random() * 21) - 10); // Números entre -10 y 10
        }
        matrix.push(row);
    }
    return matrix;
}

/**
 * Carga matrices de ejemplo (2x2) para pruebas rápidas.
 */
export function loadExample() {
    hideMessages();
    additionalResultsDisplay.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');

    matrixSizeInput.value = 2; // Fija el tamaño a 2
    currentMatrixSize = 2;
    currentMatrixA = [[1, 2], [3, 4]];
    currentMatrixB = [[5, 6], [7, 8]];

    displayMatrix(matrixAGrid, currentMatrixA, true);
    displayMatrix(matrixBGrid, currentMatrixB, true);

    matrixInputArea.classList.remove('hidden');
    operationsSection.classList.remove('hidden');
    resultsArea.classList.remove('hidden');

    displayMessage("Ejemplo de matrices 2x2 cargado.", false);
}

/**
 * Limpia todas las matrices de entrada y resultados, reseteando la interfaz.
 */
export function clearAll() {
    hideMessages();
    matrixAGrid.innerHTML = '';
    matrixBGrid.innerHTML = '';
    resultMatrixGrid.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');
    additionalResultsDisplay.innerHTML = '';

    currentMatrixA = null;
    currentMatrixB = null;
    currentMatrixSize = 0;

    matrixInputArea.classList.add('hidden');
    operationsSection.classList.add('hidden');
    resultsArea.classList.add('hidden');

    matrixSizeInput.value = 3; // Resetear tamaño por defecto
    displayMessage("Todas las matrices han sido limpiadas y la interfaz reiniciada.", false);
}

/**
 * Intenta obtener las matrices A y B de los inputs.
 * Si las matrices no han sido creadas, lanza un error.
 * @returns {{matrixA: number[][], matrixB: number[][]}}
 */
function getMatricesForOperation() {
    // comprobar que el tamaño actual es válido antes de intentar leer los inputs
    if (currentMatrixSize === 0 || isNaN(currentMatrixSize) || currentMatrixSize < 2 || currentMatrixSize > 10) {
        throw new Error("El tamaño de la matriz no es válido. Por favor, crea las matrices primero.");
    }
    // Siempre intentar leer los valores actuales de los inputs
    const matrixA = getMatrixValuesFromInputs(matrixAGrid, currentMatrixSize);
    const matrixB = getMatrixValuesFromInputs(matrixBGrid, currentMatrixSize);
    return { matrixA, matrixB };
}


/**
 * Manejador de eventos para operaciones binarias (suma, resta, multiplicación).
 * @param {function} operationFn La función de matrix-operations.js a ejecutar.
 * @param {string} operationSymbol Símbolo de la operación para mostrar en el mensaje (ej: '+', '×')
 * @param {boolean} [isSubtractionBA=false] Si es B-A (para manejar el orden).
 */
export function handleBinaryMatrixOperation(operationFn, operationSymbol, isSubtractionBA = false) {
    hideMessages();
    additionalResultsDisplay.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');

    try {
        const { matrixA, matrixB } = getMatricesForOperation();
        let result;

        if (isSubtractionBA) {
            result = operationFn(matrixB, matrixA); // B - A
        } else {
            result = operationFn(matrixA, matrixB);
        }
        displayMatrix(resultMatrixGrid, result, false);
        resultMatrixContainer.classList.remove('hidden');
        displayMessage(`Operación "${isSubtractionBA ? 'B - A' : `A ${operationSymbol} B`}" realizada con éxito.`, false);
    } catch (error) {
        displayMessage(error.message, true);
    }
}

/**
 * Manejador de eventos para operaciones unarias (transposición, determinante, inversa).
 * @param {function} operationFn La función de matrix-operations.js a ejecutar.
 * @param {string} matrixId Identificador de la matriz ('A' o 'B')
 * @param {string} operationType 'transpose', 'determinant', 'inverse'
 */
export function handleUnaryMatrixOperation(operationFn, matrixId, operationType) {
    hideMessages();
    additionalResultsDisplay.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');

    try {
        const targetMatrixGrid = matrixId === 'A' ? matrixAGrid : matrixBGrid;
        const matrix = getMatrixValuesFromInputs(targetMatrixGrid, currentMatrixSize);

        let result;
        switch (operationType) {
            case 'transpose':
                result = operationFn(matrix);
                displayMatrix(resultMatrixGrid, result, false);
                resultMatrixContainer.classList.remove('hidden');
                displayMessage(`Transpuesta de la matriz ${matrixId} (${matrixId}<sup>T</sup>) calculada.`, false);
                break;
            case 'determinant':
                result = operationFn(matrix);
                additionalResultsDisplay.innerHTML = `<h3>Determinante de la Matriz ${matrixId} (det(${matrixId})):</h3><p>${result.toFixed(4)}</p>`;
                displayMessage("Determinante calculado con éxito.", false);
                break;
            case 'inverse':
                result = operationFn(matrix);
                displayMatrix(resultMatrixGrid, result, false);
                resultMatrixContainer.classList.remove('hidden');

                // Verificación: A * A^-1 = I
                const originalMatrix = getMatrixValuesFromInputs(targetMatrixGrid, currentMatrixSize); // Leer de nuevo para asegurar
                try {
                    const identityCheck = MatrixOperations.checkInverse(originalMatrix, result);
                    let identityHtml = `<h3>Verificación (${matrixId} × ${matrixId}<sup>-1</sup> = I):</h3><div class="matrix-grid" style="grid-template-columns: repeat(${currentMatrixSize}, minmax(60px, 1fr));">`;
                    for (let i = 0; i < currentMatrixSize; i++) {
                        for (let j = 0; j < currentMatrixSize; j++) {
                            // Redondear para la visualización de la matriz identidad
                            const val = Math.abs(identityCheck[i][j]) < 1e-9 ? 0 : identityCheck[i][j];
                            identityHtml += `<div class="matrix-result-cell">${val.toFixed(4)}</div>`;
                        }
                    }
                    identityHtml += '</div>';
                    additionalResultsDisplay.innerHTML += identityHtml;
                } catch (checkError) {
                    additionalResultsDisplay.innerHTML += `<p class="error-text">Error en verificación: ${checkError.message}</p>`;
                }
                displayMessage(`Inversa de la matriz ${matrixId} (${matrixId}<sup>-1</sup>) calculada.`, false);
                break;
            default:
                throw new Error("Tipo de operación unaria no soportado.");
        }
    } catch (error) {
        displayMessage(error.message, true);
    }
}

/**
 * Manejador para la multiplicación por escalar.
 * @param {string} matrixId Identificador de la matriz ('A' o 'B')
 */
export function handleScalarMultiply(matrixId) {
    hideMessages();
    additionalResultsDisplay.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');

    try {
        const scalar = parseFloat(scalarInput.value);
        if (isNaN(scalar)) {
            throw new Error("El escalar debe ser un número válido.");
        }

        const { matrixA, matrixB } = getMatricesForOperation();
        const targetMatrix = matrixId === 'A' ? matrixA : matrixB;
        
        const result = MatrixOperations.scalarMultiply(scalar, targetMatrix);
        displayMatrix(resultMatrixGrid, result, false);
        resultMatrixContainer.classList.remove('hidden');
        displayMessage(`Multiplicación por escalar k × ${matrixId} realizada con éxito.`, false);
    } catch (error) {
        displayMessage(error.message, true);
    }
}

/**
 * Manejador para la generación de la matriz identidad.
 */
export function handleIdentityMatrixGeneration() {
    hideMessages();
    additionalResultsDisplay.innerHTML = '';
    resultMatrixContainer.classList.add('hidden');

    try {
        const size = parseInt(matrixSizeInput.value); // Usa el tamaño general
        const identity = MatrixOperations.generateIdentityMatrix(size);
        displayMatrix(resultMatrixGrid, identity, false);
        resultMatrixContainer.classList.remove('hidden');
        displayMessage(`Matriz Identidad I<sub>${size}</sub> generada con éxito.`, false);
    } catch (error) {
        displayMessage(error.message, true);
    }
}
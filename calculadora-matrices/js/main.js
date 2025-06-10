// js/main.js
import {
    createMatrices,
    randomizeMatrices,
    loadExample,
    clearAll,
    handleBinaryMatrixOperation,
    handleUnaryMatrixOperation,
    handleScalarMultiply,
    handleIdentityMatrixGeneration,
    hideMessages // Para ocultar mensajes al cambiar el tamaño
} from './ui-handlers.js';
import * as MatrixOperations from './matrix-operations.js'; // Necesario para pasar funciones como argumentos

// Referencias a elementos del DOM
const matrixSizeInput = document.getElementById('matrix-size');
const createMatricesButton = document.getElementById('createMatrices');
const randomizeMatricesButton = document.getElementById('randomizeMatrices');
const loadExampleButton = document.getElementById('loadExample');
const clearAllMatricesButton = document.getElementById('clearAllMatrices');

// Botones de operaciones
const addMatricesButton = document.getElementById('addMatrices');
const subtractABButton = document.getElementById('subtractAB');
const subtractBAButton = document.getElementById('subtractBA');
const multiplyMatricesButton = document.getElementById('multiplyMatrices');
const scalarMultiplyAButton = document.getElementById('scalarMultiplyA');
const scalarMultiplyBButton = document.getElementById('scalarMultiplyB');
const transposeAButton = document.getElementById('transposeA');
const transposeBButton = document.getElementById('transposeB');
const determinantAButton = document.getElementById('determinantA');
const determinantBButton = document.getElementById('determinantB');
const inverseAButton = document.getElementById('inverseA');
const inverseBButton = document.getElementById('inverseB');
const identityMatrixButton = document.getElementById('identityMatrix');

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la interfaz (limpiar y ocultar secciones)
    clearAll(); 

    // Event Listeners para la configuración inicial de matrices
    createMatricesButton.addEventListener('click', createMatrices);
    randomizeMatricesButton.addEventListener('click', randomizeMatrices);
    loadExampleButton.addEventListener('click', loadExample);
    clearAllMatricesButton.addEventListener('click', clearAll);

    // Ocultar mensajes al cambiar el tamaño si ya hay matrices visibles
    matrixSizeInput.addEventListener('change', () => {
        // No ocultamos las matrices si el usuario solo está ajustando el tamaño
        // antes de hacer clic en "Crear Matrices".
        // Sin embargo, si ya hay matrices, esto no afectará los grids existentes hasta que se "creen" de nuevo.
        hideMessages(); 
    });


    // Event Listeners para operaciones binarias
    addMatricesButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.addMatrices, '+'));
    subtractABButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.subtractMatrices, '-'));
    subtractBAButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.subtractMatrices, '-', true)); // isSubtractionBA = true
    multiplyMatricesButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.multiplyMatrices, '×'));

    // Event Listeners para multiplicación por escalar
    scalarMultiplyAButton.addEventListener('click', () => handleScalarMultiply('A'));
    scalarMultiplyBButton.addEventListener('click', () => handleScalarMultiply('B'));

    // Event Listeners para operaciones unarias
    transposeAButton.addEventListener('click', () => handleUnaryMatrixOperation(MatrixOperations.transposeMatrix, 'A', 'transpose'));
    transposeBButton.addEventListener('click', () => handleUnaryMatrixOperation(MatrixOperations.transposeMatrix, 'B', 'transpose'));
    determinantAButton.addEventListener('click', () => handleUnaryMatrixOperation(MatrixOperations.determinant, 'A', 'determinant'));
    determinantBButton.addEventListener('click', () => handleUnaryMatrixOperation(MatrixOperations.determinant, 'B', 'determinant'));
    inverseAButton.addEventListener('click', () => handleUnaryMatrixOperation(MatrixOperations.inverseMatrix, 'A', 'inverse'));
    inverseBButton.addEventListener('click', () => handleUnaryMatrixOperation(MatrixOperations.inverseMatrix, 'B', 'inverse'));

    // Event Listener para matriz identidad (usa el tamaño general)
    identityMatrixButton.addEventListener('click', handleIdentityMatrixGeneration);
});
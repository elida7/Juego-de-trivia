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

//Botones de configuracion
const createMatricesButton = document.getElementById('createMatricesButton');
const randomizeMatricesButton = document.getElementById('randomizeMatricesButton');
const loadExampleButton = document.getElementById('loadExampleButton');
const clearAllMatricesButton = document.getElementById('clearAllMatricesButton');

// Botones de operaciones
const addMatricesButton = document.getElementById('addMatricesButton');
const subtractABButton = document.getElementById('subtractABButton');
const subtractBAButton = document.getElementById('subtractBAButton');
const multiplyMatricesButton = document.getElementById('multiplyMatricesButton');
const scalarMultiplyAButton = document.getElementById('scalarMultiplyAButton');
const scalarMultiplyBButton = document.getElementById('scalarMultiplyBButton');
const transposeAButton = document.getElementById('transposeAButton');
const transposeBButton = document.getElementById('transposeBButton');
const determinantAButton = document.getElementById('determinantAButton');
const determinantBButton = document.getElementById('determinantBButton');
const inverseAButton = document.getElementById('inverseAButton');
const inverseBButton = document.getElementById('inverseBButton');
const identityMatrixButton = document.getElementById('identityMatrixButton');

document.addEventListener('DOMContentLoaded', () => {
    // 1 Inicializar la interfaz (limpiar y ocultar secciones)
    clearAll(); 

    //2 Configurar los Event Listeners para los botones de configuracion
    createMatricesButton.addEventListener('click', createMatrices);
    randomizeMatricesButton.addEventListener('click', randomizeMatrices);
    loadExampleButton.addEventListener('click', loadExample);
    clearAllMatricesButton.addEventListener('click', clearAll);

    // Ocultar mensajes al cambiar el tamaño si ya hay matrices visibles
    matrixSizeInput.addEventListener('change', () => {
       hideMessages(); 
    });


    // 3 event listener para los botones de operacion
    addMatricesButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.addMatrices, '+'));
    subtractABButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.subtractMatrices, '-', true)); // isSubtractionBA = true
    subtractBAButton.addEventListener('click', () => handleBinaryMatrixOperation(MatrixOperations.subtractMatrices, '-', false)); // A - B, for clarity, though default is false
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
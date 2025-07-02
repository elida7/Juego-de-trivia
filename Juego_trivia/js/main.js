// js/main.js
// Este es el archivo principal. se uso para inicializar mi aplicación
// y configurar los event listeners para las interacciones clave de la UI.

import { fetchCategories, fetchQuestions } from './api.js';
import { initGame, gameState } from './game-logic.js';
import { showScreen, populateCategories, validatePlayerName } from './ui-handlers.js';

//  referencias a los elementos clave del DOM que necesita para los event listeners.
const playerNameInput = document.getElementById('playerName');
const startGameButton = document.getElementById('startGameButton');
const numQuestionsInput = document.getElementById('numQuestions');
const difficultySelect = document.getElementById('difficulty');
const categorySelect = document.getElementById('category');

const restartGameSameConfigButton = document.getElementById('restartGameSameConfig');
const changeConfigAndRestartButton = document.getElementById('changeConfigAndRestart');
const exitGameButton  = document.getElementById('exitGame');

/**
 *  asegura de que mi código se ejecute solo cuando todo el HTML ha sido cargado.
 * Esto previene errores al intentar acceder a elementos que aún no existen en el DOM.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // muestra la pantalla de configuración al inicio.
    showScreen('config-screen');

    //  intenta cargar las categorías de la API en cuanto la página está lista.
    try {
        const categories = await fetchCategories(); // Uso 'await' porque 'fetchCategories' es asíncrona.
        populateCategories(categories); // Yo relleno el selector de categorías con las opciones obtenidas.
    } catch (error) {
        console.error('Error al cargar categorías en el inicio:', error);
        // Si hay un error,  muestro en la consola, pero el juego puede continuar
        // con la opción "Todas las categorías" por defecto.
    }

    //  configuro los event listeners para mis botones.
    setupEventListeners();
});

/**
 * configuro todos los event listeners para los botones de mi aplicación.
 * Los agrupo aquí para mantener mi código organizado.
 */
function setupEventListeners() {
    // Cuando hace clic en el botón de "Empezar Juego":
    startGameButton.addEventListener('click', async () => {
        //obtiene los valores de configuración que el usuario ha introducido.
        const playerName = playerNameInput.value.trim(); // Elimino espacios en blanco al inicio y al final.
        const numQuestions = parseInt(numQuestionsInput.value);
        const difficulty = difficultySelect.value;
        const category = categorySelect.value;
    
        // Primero, valida el nombre del jugador. Si no es válido, detengo el proceso.
        if (!validatePlayerName(playerName)) {
            return; // Salgo de la función si el nombre no es válido.
        }
        // Yo muestro la pantalla de carga mientras espero las preguntas de la API.
        showScreen('loading-screen');
        
    try {
        // llama  función de la API para obtener las preguntas con la configuración seleccionada.
         // Uso 'await' porque 'fetchQuestions' es una función asíncrona.
        
        const questions = await fetchQuestions({ amount: numQuestions, difficulty, category});
        // Si las preguntas se obtienen con éxito,  inicializo el juego.
        initGame(questions, playerName);
        
        //cambia la pantalla de juego
        showScreen('game-screen');
    
    } catch (error) {
        // Si hay algún error al obtener las preguntas (ej. problemas de red, no hay suficientes preguntas),
        //  muestro en la consola y vuelvo a la pantalla de configuración para que el usuario intente de nuevo.    
        console.error('Error al iniciar el juego:', error);
        alert('Error al iniciar el juego: ' + error.message); // Muestra una alerta al usuario.
        showScreen('config-screen'); // Lo devuelve a la pantalla de configuración.
    }
});
 // Cuando hace clic en "Jugar de Nuevo" (con la misma configuración):
restartGameSameConfigButton.addEventListener('click', () => {
    //  reinicio el juego con las mismas preguntas que ya tenía (si el juego actual terminó).
    initGame(gameState.questions, gameState.playerName,); // Reutiliza las preguntas y el nombre del estado actual.
    showScreen('game-screen'); //  lleva de vuelta a la pantalla de juego.
});

// Cuando hago clic en "Cambiar Configuración":
changeConfigAndRestartButton.addEventListener('click', () => {
    showScreen('config-screen');
});

// Cuando hago clic en "Salir del Juego":
exitGameButton.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres salir del juego?')) {
        window.location.href = 'about:blank'; // redirijo a una página en blanco.
    }
});
}
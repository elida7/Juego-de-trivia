
import { fetchCategories, fetchQuestions } from './api.js';
import { initGame, startTimer } from './game-logic.js';
import { showScreen, updateQuestionUI } from './ui-handlers.js';


const gameSetupForm = document.getElementById('config-screen');
const playerNameInput = document.getElementById('playerName');
const startGameButton = document.getElementById('startGameButton');

const restartButton = document.getElementById('restartGameSameConfig');
const changeConfigButton = document.getElementById('changeConfigAndRestart');
const exitButton = document.getElementById('exitGame');

loadCategories();

startGameButton.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const playerName = playerNameInput.value.trim();
    if (playerName.length < 2 || playerName.length > 20) {
        document.getElementById('playerNameError').textContent = 'El nombre debe tener entre 2 y 20 caracteres';
        return;
    }

    const config = {
        questionCount: parseInt(document.getElementById('numQuestions').value),
        difficulty: document.getElementById('difficulty').value,
        category: document.getElementById('category').value,
        playerName
    };
    
    if (config.questionCount < 5 || config.questionCount > 20) {
        alert('El número de preguntas debe estar entre 5 y 20');
        return;
    }
    
    showScreen('loading');
    
    try {
        const questions = await fetchQuestions(config);
        initGame(questions);
        
        showScreen('game');
        updateQuestionUI();
        startTimer(handleTimeUp);
    } catch (error) {
        console.error('Error al iniciar el juego:', error);
        alert('Error al cargar las preguntas. Por favor, intenta con otra configuración.');
        showScreen('config');
    }
});


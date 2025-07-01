

import { getCurrentQuestion, nextQuestion, handleAnswer, startTimer, stopTimer, getTimeLeft, getGameStats } from './game-logic.js';


const screens = {
    config: document.getElementById('config-screen'),
    loading: document.getElementById('loading-screen'),
    game: document.getElementById('game-screen'),
    results: document.getElementById('results-screen')
};

const questionElements = {
    text: document.getElementById('questionText'),
    container: document.getElementById('answerButtons'),
    counter: document.getElementById('questionCounter'),
    total: document.getElementById('totalQuestions')
};


const timerElements = {
    display: document.getElementById('timerDisplay'),
    bar: document.getElementById('timerBar')
};

const resultElements = {
    playerName: document.getElementById('finalPlayerName'),
    score: document.getElementById('finalScore'),
    correct: document.getElementById('correctAnswers'),
    total: document.getElementById('questionsAttempted'),
    accuracy: document.getElementById('accuracyPercentage'),
    avgTime: document.getElementById('averageTime')
};





export function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.add('hidden');
    });
    screens[screenName].classList.remove('hidden');
}

export function updateQuestionUI() {
    const question = getCurrentQuestion();
    
    questionElements.text.textContent = question.question;
    questionElements.counter.textContent = gameState.currentQuestionIndex + 1;
    questionElements.total.textContent = gameState.questions.length;
    
    // Mezclar respuestas y crear botones
    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);
    
    questionElements.container.innerHTML = '';
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswerSelection(answer));
        questionElements.container.appendChild(button);
    });
    
    // Actualizar temporizador
    updateTimerUI();
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
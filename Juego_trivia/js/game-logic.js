
// Estado del juego
let gameState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    timeLeft: 20,
    totalTimeUsed: 0,
    timerInterval: null
};

/**
 * Inicializa un nuevo juego con las preguntas proporcionadas
 */
export function initGame(questions) {
    gameState = {
        questions,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        timeLeft: 20,
        totalTimeUsed: 0,
        timerInterval: null
    };
}

/**
 * Obtiene la pregunta actual
 */
export function getCurrentQuestion() {
    return gameState.questions[gameState.currentQuestionIndex];
}


export function nextQuestion() {
    gameState.currentQuestionIndex++;
    gameState.timeLeft = 20;
    
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        return false;
    }
    return true;
}



export function handleAnswer(selectedAnswer) {
    const question = getCurrentQuestion();
    const isCorrect = selectedAnswer === question.correct_answer;
    
    gameState.totalTimeUsed += (20 - gameState.timeLeft);
    
    if (isCorrect) {
        gameState.score += 10;
        gameState.correctAnswers++;
    }
        
    return {
        isCorrect,
        correctAnswer: question.correct_answer
    };
}



export function startTimer(onTimeUp) {
    clearInterval(gameState.timerInterval);
    gameState.timeLeft = 20;
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            gameState.totalTimeUsed += 20;
            onTimeUp();
        }
    }, 1000);
}


export function stopTimer() {
    clearInterval(gameState.timerInterval);
}


export function getTimeLeft() {
    return gameState.timeLeft;
}

export function getGameStats() {
    return {
        score: gameState.score,
        correctAnswers: gameState.correctAnswers,
        totalQuestions: gameState.questions.length,
        accuracy: Math.round((gameState.correctAnswers / gameState.questions.length) * 100),
        avgTime: (gameState.totalTimeUsed / gameState.questions.length).toFixed(1)
    };
}
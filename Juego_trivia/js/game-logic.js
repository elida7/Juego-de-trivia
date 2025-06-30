

let gameState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    timeLeft: 20,
    totalTimeUsed: 0,
    timerInterval: null
};


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
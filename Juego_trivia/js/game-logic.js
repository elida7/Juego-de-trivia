// js/game-logic.js
//  módulo central para la lógica del juego de trivia.
// Aquí mantengo el estado del juego, controlo el flujo de las preguntas,
// manejo el temporizador y calculo la puntuación.


import { showScreen, updateQuestionUI, updateTimerDisplay, setTimerBarWidth, highlightTimerBar, showFeedbackMessage, hideFeedbackMessage, displayResults, resetGameUI } from './ui-handlers.js';
// importa funciones de 'ui-handlers.js' porque necesito manipular la interfaz.

// define estado global del juego. Lo mantengo aquí para que sea accesible
// por todas las funciones de lógica del juego.

const gameState = {
    playerName: '',
    questions: [], // guarda las preguntas que obtengo de la API.
    currentQuestionIndex: 0, // Índice de la pregunta actual que se está mostrando.
    score: 0, // Puntuación total del jugador.
    correctAnswers: 0, // Contador de respuestas correctas.
    incorrectAnswers: 0, // Contador de respuestas incorrectas.
    timer: null, // Referencia a mi temporizador (para poder detenerlo).
    timeLeft: 0, // Segundos restantes para la pregunta actual.
    questionTimeLimit: 20, // Mi límite de tiempo para cada pregunta en segundos.
    totalTimeSpent: 0, // Tiempo acumulado que el jugador tarda en responder.
    questionsAttempted: 0 // Cantidad de preguntas que el jugador ha intentado responder (incluyendo tiempo agotado).
};


// exporta esta variable para que 'main.js' o 'ui-handlers.js' puedan acceder a ciertos estados si es necesario.
export { gameState };

/**
 * Inicializa un nuevo juego con las preguntas proporcionadas
 * @param {Array} questions - El arreglo de preguntas obtenidas de la API.
 * @param {string} playerName - El nombre del jugador
 */
export function initGame(questions, playerName) {
    // resetea estado del juego a los valores iniciales para un nuevo juego.
    gameState.playerName = playerName
    gameState.questions = questions;
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.totalTimeSpent = 0;
    gameState.questionsAttempted = 0;

    //  asegurar de limpiar cualquier temporizador anterior.
    clearInterval(gameState.timer);
    gameState.timer = null;

    //  reseteo la interfaz visual del juego.
    resetGameUI(questions.length);

    // Y luego cargar la primera pregunta.
    loadQuestion();
}

/**
 * Obtiene la pregunta actual en la inerfaz y gestionar el flujo
 */
function loadQuestion() {
    // esconde cualquier mensaje de feedback anterior.
    hideFeedbackMessage();

    // incrementa el contador de preguntas intentadas.
    gameState.questionsAttempted++;

    // Si ya se pasado todas las preguntas, finalizo el juego.
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        endGame();
        return;
    }
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    // actualiza la interfaz de usuario con la nueva pregunta y opciones.
    updateQuestionUI(currentQuestion, gameState.currentQuestionIndex + 1, gameState.questions.length);

    //  resetea el temporizador para la nueva pregunta y lo inicio.
    gameState.timeLeft = gameState.questionTimeLimit;
    updateTimerDisplay(gameState.timeLeft); // Muestro el tiempo inicial.
    setTimerBarWidth(100); // La barra de tiempo empieza llena.
    highlightTimerBar(false); // Quito cualquier color de advertencia.

    // limpia cualquier temporizador anterior y inicio uno nuevo.
    clearInterval(gameState.timer); // Me aseguro de que no haya temporizadores duplicados.
    gameState.timer = setInterval(() => {
        gameState.timeLeft--; // Yo decremento el tiempo restante.
        updateTimerDisplay(gameState.timeLeft); // Actualizo la interfaz del temporizador.
        setTimerBarWidth((gameState.timeLeft / gameState.questionTimeLimit) * 100); // Actualizo la barra visual.

        // Yo cambio el color del temporizador si quedan pocos segundos.
        if (gameState.timeLeft <= 5) {
            highlightTimerBar(true);
        } else {
            highlightTimerBar(false);
        }
        // Si el tiempo se agotó:
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer); // detiene el temporizador.
            showFeedbackMessage("¡Tiempo agotado!", false, true); // Muestro un mensaje de tiempo agotado.
            // asegura de que la respuesta incorrecta se marque.
            // No sumar puntos y avanzo a la siguiente pregunta después de un breve retraso.
            setTimeout(() => {
                goToNextQuestion();
            }, 1500); // Doy un tiempo para que el usuario vea el mensaje.
        }
    }, 1000); // actualiza el temporizador cada segundo (1000 ms).
}

/**
 * encargodo de manejar la respuesta del usuario a una pregunta.
 * @param {string} selectedAnswer - La respuesta que el usuario seleccionó.
 */

export function handleAnswer(selectedAnswer) {
    clearInterval(gameState.timer); // detiene el temporizador en cuanto el usuario responde.
    hideFeedbackMessage(); // Esconde cualquier mensaje previo.

    const currentQuestion  = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    if (isCorrect) {
        gameState.score += 10; //suma 10 si es correcta
        gameState.correctAnswers++;   //  incremento del contador de respuestas correctas.
        showFeedbackMessage("¡Correcto!", true); // Muestra un mensaje de éxito.
    } else {
        gameState.incorrectAnswers++; //  incrementa el contador de respuestas incorrectas.
        showFeedbackMessage(`¡Incorrecto! La respuesta correcta era: ${currentQuestion.correct_answer}`, false); // Muestra un mensaje de error y la respuesta correcta.
    }
        
    //  registra el tiempo que tomó responder a esta pregunta.
    gameState.totalTimeSpent += (gameState.questionTimeLimit - gameState.timeLeft);

    //  avanza a la siguiente pregunta después de un breve retraso para que el usuario vea el feedback.
    setTimeout(() => {
        goToNextQuestion();
    }, 2000); //  2 segundos para ver el feedback.
}

/**
 * avanza  al siguiente índice de pregunta.
 */
function goToNextQuestion() {
    gameState.currentQuestionIndex++; // incrementa el índice de la pregunta actual.
    loadQuestion(); // cargar la siguiente pregunta (o finalizo el juego si no hay más).
}  

/**
 * encargado de finalizar el juego y mostrar los resultados finales.
 */
function endGame() {
    clearInterval(gameState.timer); // aseguro de que el temporizador esté detenido.
    showScreen('results-screen'); //  cambio a la pantalla de resultados.

    //  calculo las estadísticas finales.
    const accuracyPercentage = gameState.questionsAttempted > 0
        ? ((gameState.correctAnswers / gameState.questionsAttempted) * 100).toFixed(2) // Calculo el porcentaje de aciertos.
        : 0; // Si no hubo preguntas intentadas, el porcentaje es 0.

    const averageTime = gameState.questionsAttempted > 0
        ? (gameState.totalTimeSpent / gameState.questionsAttempted).toFixed(2) // Calculo el tiempo promedio.
        : 0;

    // muestro los resultados en la interfaz.
    displayResults(
        gameState.playerName,
        gameState.score,
        gameState.correctAnswers,
        gameState.questions.length, // Total de preguntas planificadas.
        accuracyPercentage,
        averageTime
    );
}
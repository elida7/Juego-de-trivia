// js/ui-handlers.js
// módulo encargado de toda la manipulación del DOM y la interfaz de usuario.
// interactúa  directamente con los elementos HTML aquí.

// obtiene referencias a todos los elementos clave del DOM que voy a manipular.
// al principio para mayor eficiencia
const configScreen = document.getElementById('config-screen');
const loadingScreen = document.getElementById('loading-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');


const playerNameInput = document.getElementById('playerName');
const playerNameError = document.getElementById('playerNameError');
const numQuestionsInput = document.getElementById('numQuestions');
const difficultySelect = document.getElementById('difficulty');
const categorySelect = document.getElementById('category');


const questionCounterSpan = document.getElementById('questionCounter');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const timerDisplaySpan = document.getElementById('timerDisplay');
const timerBar = document.getElementById('timerBar');
const questionTextElement = document.getElementById('questionText');
const answerButtonsContainer = document.getElementById('answerButtons');
const feedbackMessageElement = document.getElementById('feedbackMessage');

const finalPlayerNameSpan = document.getElementById('finalPlayerName');
const finalScoreSpan = document.getElementById('finalScore');
const correctAnswersSpan = document.getElementById('correctAnswers');
const questionsAttemptedSpan = document.getElementById('questionsAttempted'); // No es questions.length, sino las intentadas.
const accuracyPercentageSpan = document.getElementById('accuracyPercentage');
const averageTimeSpan = document.getElementById('averageTime');


// Yo importoa la función 'handleAnswer' de game-logic porque es mi lógica de juego
//  maneja lo que sucede cuando se hace clic en una respuesta.
import { handleAnswer, gameState } from './game-logic.js'; // Importo gameState para el total de preguntas.

/**
 *  encargodo de mostrar una pantalla específica y ocultar las demás.
 * @param {string} screenId - El ID de la pantalla que yo quiero mostrar (ej. 'config-screen', 'game-screen').
 */

export function showScreen(screenId) {
    // obtiene las pantallas 
    const screens = document.querySelectorAll('.game-screen');
    // Para cada pantalla,  le añado la clase 'hidden' para ocultarla.
    screens.forEach(screen => screen.classList.add('hidden'));

    // Luego, encuentra la pantalla que quiero mostrar y le quito la clase 'hidden',
    // y le añado la clase 'active' para indicar que es la que está visible.
    document.getElementById(screenId).classList.remove('hidden');
    document.getElementById(screenId).classList.add('active'); // Opcional, para CSS si se necesita.

}

/**
 * actualiza la interfaz de usuario con la pregunta actual.
 * @param {object} questionData - El objeto de la pregunta actual (texto, opciones, etc.).
 * @param {number} currentNum - El número de pregunta actual (ej. 1 de 10).
 * @param {number} totalNum - El número total de preguntas.
 */
export function updateQuestionUI(questionData, currentNum, totalNum) {
    // actualiza el contador de preguntas en la parte superior.
    questionCounterSpan.textContent = currentNum;
    totalQuestionsSpan.textContent = totalNum;

    // Decodifica las entidades HTML en el texto de la pregunta y las opciones.
    // importante porque la API devuelve cadenas como "&amp;" en lugar de "&".
    questionTextElement.innerHTML = decodeHtmlEntities(questionData.question);

    //limpia cualquier botón de respuesta anterior.
    answerButtonsContainer.innerHTML = '';
    
    // Mezclar respuestas en un solo arreglo
    const answers = [...questionData.incorrect_answers, questionData.correct_answer];
    // mezcla aleatoriamente para que la respuesta correcta no siempre esté en el mismo lugar.
    const shuffledAnswers = shuffleArray(answers);
    
    // por cada respuesta crea boton y lo añade
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn'); // añade la clase de estilo
        button.innerHTML = decodeHtmlEntities(answer); // Decodifica el texto de la respuesta.
        //  añade un 'event listener' al botón. Cuando se haga clic, llamo a 'handleAnswer'.
        // Pasa el texto de la respuesta como argumento.
        button.addEventListener('click', () => {
            disableAnswerButtons(); // Deshabilita los botones para evitar múltiples clics.
            // Añadir clase 'selected' al botón presionado para feedback visual
            button.classList.add('selected');
            // setTimeout para dar un pequeño delay antes de procesar y mostrar respuesta correcta/incorrecta
            setTimeout(() => {
                if (answer === questionData.correct_answer) {
                    button.classList.add('correct'); // Si es correcta, la marco en verde.
                } else {
                    button.classList.add('incorrect'); // Si es incorrecta, la marco en rojo.
                    // Y también marco la correcta para que el usuario la vea.
                    const correctButton = Array.from(answerButtonsContainer.children).find(btn => btn.textContent === decodeHtmlEntities(questionData.correct_answer));
                    if (correctButton) {
                        correctButton.classList.add('correct');
                    }
                }
                handleAnswer(answer); // Finalmente,  llamo a la lógica del juego para procesar la respuesta.
            }, 500); // Pequeño delay.
        });
        answerButtonsContainer.appendChild(button); // añade el botón al HTML.
    });
}
    
    
/**
 * deshabilita todos los botones de respuesta después de que el usuario selecciona una.
 * Esto evita clics duplicados y errores.
 */
function disableAnswerButtons() {
    const buttons = answerButtonsContainer.querySelectorAll('.answer-btn');
    buttons.forEach(button => button.disabled = true); // Pongo la propiedad 'disabled' a true.
}

/**
 * actualiza la pantalla del temporizador con el tiempo restante.
 * @param {number} timeLeft - El tiempo restante en segundos.
 */
export function updateTimerDisplay(timeLeft) {
    timerDisplaySpan.textContent = timeLeft; // Simplemente actualizo el texto del 'span'.
}

/**
 * actualiza el ancho de la barra de temporizador para mostrar el progreso visualmente.
 * @param {number} percentage - El porcentaje de tiempo restante (0-100).
 */
export function setTimerBarWidth(percentage) {
    // establece el ancho del pseudo-elemento ::before de mi barra de tiempo.
    // Con CSS,  ya definí una transición suave para esto.
    timerBar.style.setProperty('--timer-width', `${percentage}%`);
    timerBar.style.width = `${percentage}%`; // Ajusta el ancho directamente.
}

/**
 *  añade o quita la clase 'timer-low' para cambiar el color del temporizador a rojo.
 * @param {boolean} isLow - Verdadero si el tiempo es bajo, falso en caso contrario.
 */
export function highlightTimerBar(isLow) {
    if (isLow) {
        timerDisplaySpan.classList.add('timer-low'); // Añado la clase para el texto.
        timerBar.classList.add('timer-low'); // Añado la clase para la barra.
    } else {
        timerDisplaySpan.classList.remove('timer-low'); // Remuevo la clase.
        timerBar.classList.remove('timer-low');
    }
}

/**
 * muestra un mensaje de feedback al usuario (correcto/incorrecto/tiempo agotado).
 * @param {string} message - El texto del mensaje.
 * @param {boolean} isCorrect - Verdadero si es un mensaje de éxito, falso para error.
 * @param {boolean} isTimeUp - Verdadero si el mensaje es por tiempo agotado.
 */
export function showFeedbackMessage(message, isCorrect, isTimeUp = false) {
    feedbackMessageElement.textContent = message; // Pongo el texto del mensaje.
    feedbackMessageElement.classList.remove('hidden', 'correct', 'incorrect'); // Limpio clases anteriores.

    if (isTimeUp) {
        //  no añade 'correct' o 'incorrect' para tiempo agotado, solo muestro el mensaje.
    } else if (isCorrect) {
        feedbackMessageElement.classList.add('correct'); // Añado clase 'correct' para color verde.
    } else {
        feedbackMessageElement.classList.add('incorrect'); // Añado clase 'incorrect' para color rojo.
    }
    feedbackMessageElement.classList.remove('hidden'); // Me aseguro de que el mensaje sea visible.
}

/**
 * escondo el mensaje de feedback.
 */
export function hideFeedbackMessage() {
    feedbackMessageElement.classList.add('hidden'); // Oculto el mensaje.
    feedbackMessageElement.classList.remove('correct', 'incorrect'); // Remuevo las clases de color.
}

/**
 * Yo muestro los resultados finales del juego en la pantalla de resultados.
 * @param {string} playerName - Nombre del jugador.
 * @param {number} score - Puntuación total.
 * @param {number} correct - Respuestas correctas.
 * @param {number} totalQuestions - Total de preguntas en el juego.
 * @param {number} accuracy - Porcentaje de acierto.
 * @param {number} avgTime - Tiempo promedio por pregunta.
 */
export function displayResults(playerName, score, correct, totalQuestions, accuracy, avgTime) {
    finalPlayerNameSpan.textContent = playerName;
    finalScoreSpan.textContent = score;
    correctAnswersSpan.textContent = correct;
    questionsAttemptedSpan.textContent = totalQuestions; // Aquí uso totalQuestions del juego para el resumen.
    accuracyPercentageSpan.textContent = accuracy;
    averageTimeSpan.textContent = avgTime;
}

/**
 * decodifica entidades HTML (como &amp; o &quot;) en una cadena de texto.
 * La API de Trivia devuelve preguntas con estas entidades, y yo quiero mostrarlas correctamente.
 * @param {string} html - La cadena HTML a decodificar.
 * @returns {string} La cadena con las entidades decodificadas.
 */
function decodeHtmlEntities(html) {
    const textarea = document.createElement('textarea'); // Yo creo un elemento temporal 'textarea'.
    textarea.innerHTML = html; // Pongo el HTML codificado dentro de él.
    return textarea.value; // El navegador decodifica automáticamente al leer el '.value'.
}

/**
 *  mezcla aleatoriamente los elementos de un arreglo (algoritmo Fisher-Yates).
 * Esto lo uso para que las opciones de respuesta no siempre aparezcan en el mismo orden.
 * @param {Array} array - El arreglo que yo quiero mezclar.
 * @returns {Array} El arreglo mezclado.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Genero un índice aleatorio.
        [array[i], array[j]] = [array[j], array[i]]; // Yo intercambio los elementos.
    }
    return array;
}

/**
 *  resetea el estado visual de la interfaz de juego.
 * Esto lo hago antes de cargar una nueva pregunta o cuando se inicia un nuevo juego.
 * @param {number} totalQuestions - El número total de preguntas para el nuevo juego.
 */
export function resetGameUI(totalQuestions) {
    totalQuestionsSpan.textContent = totalQuestions; // Actualizo el total de preguntas en la UI.
    questionCounterSpan.textContent = '1'; // Reseteo el contador de pregunta a 1.
    timerDisplaySpan.textContent = gameState.questionTimeLimit; // Reseteo el temporizador a su valor inicial.
    setTimerBarWidth(100); // Lleno la barra de tiempo.
    highlightTimerBar(false); // Quito el resalte de tiempo bajo.
    questionTextElement.textContent = 'Cargando pregunta...'; // Texto de carga para la pregunta.
    answerButtonsContainer.innerHTML = ''; // Limpio los botones de respuesta.
    hideFeedbackMessage(); // Oculto cualquier mensaje de feedback.
}

/**
 * Yo me encargo de llenar el selector de categorías en la pantalla de configuración.
 * @param {Array} categories - Un arreglo de objetos de categoría (id, name) de la API.
 */
export function populateCategories(categories) {
    // Yo empiezo con la opción 'Todas las categorías' que ya está en mi HTML.
    // Remuevo cualquier opción dinámica previa para evitar duplicados.
    const existingDynamicOptions = categorySelect.querySelectorAll('option[value]:not([value="any"])');
    existingDynamicOptions.forEach(option => option.remove());

    // Yo añado las nuevas categorías obtenidas de la API.
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // El valor será el ID de la categoría de la API.
        option.textContent = category.name; // El texto visible será el nombre de la categoría.
        categorySelect.appendChild(option); // Yo añado la opción al select.
    });
}

/**
 * Yo valido el nombre del jugador.
 * @param {string} name - El nombre ingresado por el jugador.
 * @returns {boolean} Verdadero si el nombre es válido, falso en caso contrario.
 */
export function validatePlayerName(name) {
    if (!name || name.length < 2 || name.length > 20) {
        playerNameError.textContent = 'El nombre debe tener entre 2 y 20 caracteres.'; // Muestro el mensaje de error.
        return false;
    }
    playerNameError.textContent = ''; // Limpio el mensaje de error si es válido.
    return true;
}


// Cache de categorías para no cargarlas múltiples veces
let categoriesCache = null;

/**
 * Obtiene las categorías disponibles desde la API
 * @returns {Promise<Array>} Lista de categorías ordenadas
 */

export async function fetchCategories() {
    if (categoriesCache) return categoriesCache;
    
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        
        if (data.trivia_categories) {
            categoriesCache = data.trivia_categories.sort((a, b) => 
                a.name.localeCompare(b.name)
            );
            return categoriesCache;
        }
        throw new Error('Formato de respuesta inesperado');
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        throw error;
    }
}
/**
 * Obtiene preguntas de la API según configuración
 * @param {Object} config - Configuración del juego
 * @returns {Promise<Array>} Lista de preguntas procesadas
 */


export async function fetchQuestions(config) {
    const { questionCount, difficulty, category } = config;
    let apiUrl = `https://opentdb.com/api.php?amount=${questionCount}&type=multiple`;
    
    if (difficulty !== 'any') {
        apiUrl += `&difficulty=${difficulty}`;
    }
    
    if (category !== 'any') {
        apiUrl += `&category=${category}`;
    }
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.response_code !== 0) {
            throw new Error(`Código de respuesta: ${data.response_code}`);
        }
        
        return data.results.map(processQuestion);
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        throw error;
    }
}

/**
 * Procesa una pregunta decodificando entidades HTML
 */
function processQuestion(question) {
    return {
        ...question,
        question: decodeHTMLEntities(question.question),
        correct_answer: decodeHTMLEntities(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(decodeHTMLEntities)
    };
}

/**
 * Decodifica entidades HTML (como &amp; -> &)
 */
function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}
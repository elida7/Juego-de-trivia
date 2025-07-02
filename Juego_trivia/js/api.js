// api.js
// Mi módulo encargado de todas las comunicaciones con la API de Open Trivia Database.


const API_BASE_URL = 'https://opentdb.com/api.php'; // URL base de la API que yo uso.
const CATEGORIES_API_URL = 'https://opentdb.com/api_category.php'; // Y esta es para obtener la lista de categorías.

/**
 * encargado de obtener las preguntas de la API de Trivia.
 * @param {object} options - Mis opciones de configuración para la petición.
 * @param {number} options.amount - La cantidad de preguntas que yo quiero (ej. 10).
 * @param {string} [options.difficulty='any'] - La dificultad: 'easy', 'medium', 'hard' o 'any'.
 * @param {number} [options.category='any'] - El ID de la categoría o 'any' para todas.
 * @returns {Promise<Array>} Una Promesa que resuelve con un arreglo de objetos de preguntas.
 */

export async function fetchQuestions({ amount, difficulty = 'any', category = 'any' }) {
    try {
        // contruye la URL de la petición usando los parámetros.
        // `URLSearchParams` me ayuda a manejar los parámetros de la URL de forma segura.
    
        const params = new URLSearchParams({
            amount: amount,
            type: 'multiple' // pide preguntas de opción múltiple.
        });

        // si la funcion no es ´any´ se añade los parametros
        if (difficulty !== 'any') {
            params.append('difficulty', difficulty);
        }
        // si la categoria no es 'any' añade ID
        if (category !== 'any') {
            params.append('category', category);
        }
    
        const url = `${API_BASE_URL}?${params.toString()}`; // Construye la URL final.
        console.log('Fetching questions from:', url); // registra la URL para depuración.

        // realiza la petición HTTP usando 'fetch'. Es una operación asíncrona.
        const response = await fetch(url);

        // Si la respuesta HTTP no es exitosa (ej. 404, 500), lanza un error.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // parseo la respuesta JSON.

        // La API de OpenTDB tiene un 'response_code' para indicar si hubo problemas.
        if (data.response_code !== 0) {
            // Si el código no es 0, algo salió mal (ej. no hay suficientes preguntas para la configuración).
            let errorMessage = 'No se pudieron obtener preguntas con la configuración seleccionada. ';
            switch (data.response_code) {
                case 1:
                    errorMessage += 'No hay suficientes preguntas para la configuración.';
                    break;
                case 2:
                    errorMessage += 'Parámetros inválidos. Por favor, revisa la configuración.';
                    break;
                case 3:
                    errorMessage += 'Token de sesión no encontrado.';
                    break;
                case 4:
                    errorMessage += 'Token de sesión agotado. Reinicia la sesión.';
                    break;
                default:
                    errorMessage += 'Código de error desconocido de la API.';
            }
            throw new Error(errorMessage);
        }

        // retorno el arreglo de preguntas si todo salió bien.
        return data.results;

    } catch (error) {
        // Si ocurre cualquier error durante la petición (red, JSON, etc.), capturo y lo relanzo
        // para que sea manejado por el código qu llamó.
        console.error('Error fetching questions:', error);
        throw new Error('Error al conectar con la API de trivia: ' + error.message);
    }
}

/**
 * Obtiene lista de categoria de la disponible de la API
 * @returns {Promise<Array>} arreglo de objetos de categoria
 */

export async function fetchCategories() {
    try{
        const response = await fetch(CATEGORIES_API_URL); // Hago la petición a la API de categorías.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parseo la respuesta JSON.
        return data.trivia_categories; // Retorno el arreglo de categorías.
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('No se pudieron cargar las categorías: ' + error.message);
    }
}
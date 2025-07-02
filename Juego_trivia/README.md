## Trivia
Este proyecto implementa un juego de trivia interactivo desarrollado con HTML, CSS y JavaScript puro. Permite a los usuarios configurar sus preferencias de juego y poner a prueba sus conocimientos mediante preguntas obtenidas de una API externa.

## Estructura del Proyecto
El proyecto está organizado en una estructura de carpetas modular para facilitar el desarrollo y mantenimiento:

juego_trivia/
├── css/
│   └── style.css           # Estilos visuales de la aplicación
├── js/
│   ├── api.js              # Funciones para interactuar con la Open Trivia Database API
│   ├── game-logic.js       # Contiene la lógica principal del juego (puntuación, avance, etc.)
│   ├── ui-handlers.js      # Maneja todas las interacciones y actualizaciones de la interfaz de usuario
│   └── main.js             # Punto de entrada del script, inicialización y event listeners principales
└── index.html              # Estructura principal de la interfaz de usuario del juego
## Características Principales
Configuración Flexible: Permite al jugador definir su nombre, número de preguntas (5-20), nivel de dificultad (Fácil, Medio, Difícil) y categoría de las preguntas.

Obtención de Preguntas Dinámica: Consume la Open Trivia Database API para cargar preguntas de forma asíncrona.

Interfaz de Juego Clara: Presenta las preguntas, opciones de respuesta como botones, y un indicador de progreso de la partida.

Temporizador Interactivo: Cada pregunta tiene un límite de 20 segundos con una barra de progreso visual. El temporizador se detiene al responder y avanza automáticamente si se agota el tiempo.

Sistema de Puntuación: Calcula la puntuación total, número de aciertos, y tiempo promedio por pregunta, mostrando un resumen al final del juego.

Feedback Visual: Proporciona feedback inmediato al usuario sobre la corrección de sus respuestas.

Control de Juego: Permite reiniciar el juego con la misma configuración o volver a la pantalla de configuración inicial.

## Notas Importantes
Idioma de las Preguntas: La Open Trivia Database API (opentdb.com) provee preguntas predominantemente en inglés y no cuenta con un parámetro para seleccionar el idioma español directamente. Para obtener preguntas en español, sería necesario integrar un servicio de traducción externo o utilizar una API de trivia diferente.

## Elida Cubaque
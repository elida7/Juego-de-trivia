
* **`index.html`**: Contiene la estructura principal de la aplicación, incluyendo los elementos de la interfaz de usuario (inputs para el tamaño de las matrices, botones para operaciones, y áreas para mostrar las matrices y resultados).
* **`css/style.css`**: Define los estilos visuales de la aplicación, garantizando una presentación clara y responsiva.
* **`js/matrix-operations.js`**: Implementa las funciones matemáticas puras para las operaciones con matrices (suma, resta, multiplicación, determinante, inversa, transpuesta, etc.).
* **`js/ui-handlers.js`**: Contiene la lógica para la interacción con la interfaz de usuario. Es responsable de leer los valores de los inputs, mostrar matrices en el DOM, manejar mensajes de éxito/error y coordinar la llamada a las funciones de `matrix-operations.js`.
* **`js/main.js`**: Es el punto de entrada de la aplicación. Se encarga de inicializar la interfaz y de adjuntar los *event listeners* a todos los botones y elementos interactivos del `index.html`, conectando las acciones del usuario con las funciones definidas en `ui-handlers.js`.

## Funcionalidades Implementadas

* Creación de matrices cuadradas de tamaño `n x n` (donde `n` está entre 2 y 10).
* Generación de matrices con valores aleatorios.
* Carga de un ejemplo predefinido de matrices 2x2.
* Limpieza de todas las matrices y reseteo de la interfaz.
* Operaciones de matrices:
    * Suma (A + B)
    * Resta (A - B y B - A)
    * Multiplicación (A × B)
    * Multiplicación por un escalar (k × A y k × B)
    * Transposición (A<sup>T</sup> y B<sup>T</sup>)
    * Cálculo del determinante (det(A) y det(B))
    * Cálculo de la inversa (A<sup>-1</sup> y B<sup>-1</sup>), incluyendo verificación (A × A<sup>-1</sup> = I).
* Generación de la matriz identidad (I<sub>n</sub>).
* Validación de entradas y mensajes de error/éxito claros para el usuario.
* Interfaz responsiva adaptable a diferentes tamaños de pantalla.

## Cómo Ejecutar el Proyecto

1.  **Clonar o Descargar:** Descarga o clona este repositorio
2.  **Abrir `index.html`:** Navega hasta la carpeta raíz del proyecto y abre el archivo `index.html` en tu navegador web preferido (Chrome, Firefox, Edge, etc.).

## Problemas
A pesar de las diversas correcciones y la refactorización del código para garantizar la coherencia de los `id` de los elementos HTML con sus referencias en JavaScript, **los botones de la interfaz de usuario aún no responden al hacer clic sobre ellos**.

He intentado:
* Verificar y corregir los IDs en `index.html` y sus correspondencias en `main.js` y `ui-handlers.js`.
* Asegurarme de que las rutas de los archivos JavaScript en `index.html` son correctas (`<script type="module" src="js/main.js"></script>`).
* Borrar la caché del navegador y recargar la página.

Sin embargo, el problema persiste. 

No he popido diagnosticar por qué los botones no están ejecutando las funciones JavaScript asociadas, a pesar de que el código parece estar correctamente estructurado y las IDs han sido verificadas múltiples veces. 

Lo resolvi instalando la extencion Live Serve

## Elida Cubaque 
## 27418291
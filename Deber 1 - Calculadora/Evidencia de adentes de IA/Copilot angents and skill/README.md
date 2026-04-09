# Calculadora EPN - Deber 1

Este repositorio contiene el código de la **Calculadora EPN**, una herramienta web diseñada para determinar si un estudiante de la **Escuela Politécnica Nacional (EPN)** aprueba una materia en función de sus notas bimestrales y del examen supletorio.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos:

- **index.html**: Este archivo sirve como la interfaz principal de la calculadora. Contiene campos de entrada para las notas del primer y segundo bimestre, así como para la nota del supletorio. También muestra los resultados de las notas finales y los mensajes correspondientes.

- **styles.css**: Este archivo se encarga de estilizar la calculadora, proporcionando una interfaz amigable y atractiva para el usuario. Incluye estilos para los elementos de entrada, botones y mensajes de resultado.

- **script.js**: Este archivo contiene la lógica de la calculadora. Se encarga de validar las entradas del usuario, calcular las notas finales basadas en las entradas y mostrar mensajes adecuados según los resultados obtenidos.

## Instalación y Configuración

Para replicar este entorno de desarrollo o utilizar **OpenCode** en tus propios proyectos, puedes instalarlo mediante la **Interfaz de Línea de Comandos (CLI)** o a través del **plugin oficial para tu editor de código**.

### Opción 1: Instalación vía CLI

Asegúrate de tener **Node.js** instalado en tu equipo:

https://nodejs.org/

Luego abre tu terminal y ejecuta:

```bash
npm i -g opencode-ai@latest
```

Esto instalará **OpenCode AI** globalmente en tu sistema.

### Opción 2: Instalación vía Plugin (Visual Studio Code)

Si prefieres usar la interfaz gráfica dentro del editor:

1. Abre **Visual Studio Code**  
2. Dirígete a **Extensiones**  
   - Windows / Linux: `Ctrl + Shift + X`  
   - Mac: `Cmd + Shift + X`
3. En la barra de búsqueda escribe:

```
OpenCode 
```

4. Selecciona la **extensión oficial** (By: SST)
5. Haz clic en **Instalar**
6. Abre la pestaña de la extensión en el panel lateral para comenzar a utilizar los **prompts de generación de código**

## Uso

Para utilizar la calculadora, simplemente abre el archivo `index.html` en un navegador web. Ingresa las notas correspondientes en los campos de entrada y haz clic en el botón "CALCULAR" para ver los resultados. La calculadora mostrará si el estudiante ha aprobado o reprobado la materia, así como la nota final calculada.
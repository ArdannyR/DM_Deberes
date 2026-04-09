# Calculadora EPN - Deber 1

Este repositorio contiene el código de la **Calculadora EPN**, una herramienta web diseñada para determinar si un estudiante de la **Escuela Politécnica Nacional (EPN)** aprueba una materia en función de sus notas bimestrales y del examen supletorio.

Todo el código de este proyecto fue generado y estructurado utilizando la inteligencia artificial **OpenCode AI**.

---

# 🚀 Instalación y Configuración de OpenCode AI

Para replicar este entorno de desarrollo o utilizar **OpenCode** en tus propios proyectos, puedes instalarlo mediante la **Interfaz de Línea de Comandos (CLI)** o a través del **plugin oficial para tu editor de código**.

---

# Opción 1: Instalación vía CLI

Asegúrate de tener **Node.js** instalado en tu equipo:

https://nodejs.org/

Luego abre tu terminal y ejecuta:

```bash
npm i -g opencode-ai@latest
```

Esto instalará **OpenCode AI** globalmente en tu sistema.

---

# Opción 2: Instalación vía Plugin (Visual Studio Code)

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

---

# 🤖 Historial de Prompts (Proceso de Desarrollo)

El desarrollo de esta calculadora fue un **proceso iterativo utilizando prompts**.  
A continuación se documentan los **7 prompts exactos** utilizados para generar el proyecto.

---

## Prompt 1 — Estructura inicial

```
Acting like an expert web designer. Please, create a full code for an index.html file. This one must include CSS and JavaScrpit.
```

---

## Prompt 2 — Lógica principal de la EPN

```
I see you made a calulcator based on the name of fonder. But the Calulator i need is one to see if an studen of the EPN (Ecuadorian university) pass his class. For it the calulato must have the following inputs: "Nota de 1er Bimestre: " (a number between 0 an 20), "Nota de 2do Bimestre: " (a number between 0 and 20), and "Nota de Supletorio: " (a number between 0 and 40); also and finally "Nota final del Semetre" (this one is not an input, it is the sum between Nota de 1er Bimentre and Nota de 2do Bimestre). Now: If Nota final de semestre is > 28 show a message in the lower part of the calulator saying "Felicidades. Pasaste sin supletorio! :D", else if Nota final de semestre is < 14 the message will says: "Sorry, has reprobado la materia :(", else (if the Nota final is between 14 and 27.97)"No pasas sin supletorio. Porfavor ingresa la Nota del supletorio". Finally with the sum between Nota final and Nota de supletorio and dividing it by 2 (This result we will call it as "Nota final de la Materia") we will have the "Nota final de la Materia". If this "Nota final de la materia" is > 24 show the message "Felicidades, pasaste con la prueba de supletorios! :)" else show "Sorry, has reprobado la materia :("
```

---

## Prompt 3 — Ajuste de rangos y mensajes

```
Corrections to the Caluladora EPN: notaFinal >= 28 (to pass with 28), notaFinalMateria >= 24 (to pass with 24), also please chance the message from the notaFinalMateria (in the else case) from "Sorry, has reprobado la materia" to "Sorry, has reprobado la materia con supletorio"
```

---

## Prompt 4 — Rediseño visual e interfaz

```
now please help me rearrenging the place of the objetcs. I want the inputs in the left side of the center, and the result of the sums in the right side of the center. In the low part the message. And the botton Calcular, at le left part, down the inputs and near to the message pls. Also change the colors, use colors or tones near to red, blue and white pls
```

---

## Prompt 5 — Refactorización y estructura de archivos

```
Ok as a final task pls. I need yo to create a folder called "Caluladora EPN" and inside of it, create a .css file and a .js (the name of those files dosent matter, you choose). So in the end we have the index.html just as the structure inide that folder, the .js as the logic and .css as the stiles of the calulator.
```

---

## Prompt 6 — Limpieza de archivos redundantes

```
Please delete the file called index.html that is outside the file Caluladora EPN (Do not delete the index.html that is INSIDE Caluladora EPN)
```

---

## Prompt 7 — Banner informativo final

```
Sorry I forgot something. In the index.html pls. Add an smal box of inromation bellow the title saying "El minimo para pasar una materia sin supletorio es de 28/40 puntos. Mientras que para pasar con el supletorio es de 24/40 puntos."
```

---

# 📌 Información del sistema de evaluación EPN

- **Nota máxima por semestre:** 40 puntos  
- **Aprobación directa:** 28/40 o más  
- **Derecho a supletorio:** entre 14 y 27.99  
- **Aprobación con supletorio:** 24/40 o más en la nota final calculada

---

# 📂 Estructura del proyecto

```
Calculadora EPN/
│
├── index.html
├── styles.css
└── script.js
```


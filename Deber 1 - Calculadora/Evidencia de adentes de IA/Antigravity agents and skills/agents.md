# Calculadora EPN - Arquitectura y Reglas

## Arquitectura de Software

La aplicación "Calculadora EPN" sigue una arquitectura frontend monolítica simple basada en tecnologías web estándar (HTML, CSS y JavaScript Vanilla). No utiliza frameworks ni gestores de paquetes, lo que garantiza una ejecución inmediata y ligera en cualquier navegador moderno.

### Componentes Principales

1. **Interfaz de Usuario (HTML5 - `index.html`)**: Define la estructura de la calculadora. Está dividida en dos secciones principales: panel de entrada de calificaciones (notas de 1er y 2do bimestre, y supletorio) y panel de resultados (nota final del semestre y estado de aprobación).
2. **Lógica de Negocio y Presentación (JavaScript - `script.js`)**: Maneja la validación de entrada en tiempo real, los cálculos de notas y la interactividad del DOM. Los eventos están acoplados directamente a los elementos del formulario (`input`, `click`, `keydown`).
3. **Estilos y Diseño (CSS3 - `styles.css`)**: Implementa un diseño atractivo y moderno ("UI aesthetics") utilizando CSS Flexbox, esquemas de color degradados, bordes redondeados y transiciones fluidas para las distintas alertas informativas (éxito, error, advertencia).

## Reglas de Negocio (Sistema EPN)

Las reglas implementadas en la lógica (basadas en el sistema de calificación de la Escuela Politécnica Nacional) son las siguientes:

- **Rango de Notas Bimestrales**: De 0 a 20 puntos por cada bimestre.
- **Rango de Nota de Supletorio**: De 0 a 40 puntos.
- **Aprobación Directa**: Si la suma de las notas del 1er y 2do bimestre es **mayor o igual a 28/40**, se aprueba la materia directamente.
- **Reprobación Directa**: Si la suma de las notas bimestrales es **menor a 14/40**, se reprueba la materia sin derecho a rendir examen supletorio.
- **Examen Supletorio**: Si la nota acumulada de los bimestres está **entre 14 y 27.99**, el estudiante debe rendir obligatoriamente el examen supletorio.
- **Aprobación con Supletorio**: La calificación final de la materia una vez dado el examen supletorio se calcula promediando la nota inicial acumulada y la nota del supletorio: `((Nota 1er Bimestre + Nota 2do Bimestre) + Nota Supletorio) / 2`. Para pasar, el resultado de este cálculo debe ser **mayor o igual a 24/40**.

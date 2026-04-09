# Guía de Ejecución y Pruebas Locales

Este documento describe cómo ejecutar y probar localmente el proyecto "Calculadora EPN". Dado que la aplicación está construida estrictamente con HTML, CSS y JavaScript Vanilla estándar, no requiere la instalación de dependencias, entornos como Node.js ni herramientas de compilación.

## Cómo Ejecutar Localmente

Existen dos maneras sencillas de inicializar este proyecto en tu computadora:

### Opción 1: Ejecución Directa en el Navegador (Método Sencillo)
1. Navega a través del explorador de archivos de tu sistema operativo hasta la carpeta del proyecto `Calculadora EPN`.
2. Ubica el archivo principal `index.html` y haz doble clic sobre él.
3. El archivo se cargará localmente (ruta `file:///...`) en tu navegador web predeterminado y la calculadora estará funcional de forma inmediata.

### Opción 2: Usar un Servidor Local de Desarrollo (Recomendado para desarrollo)
Si deseas realizar modificaciones al código y ver los cambios visualizados en tiempo real:
1. Abre la carpeta del proyecto completo en tu IDE preferido, como **Visual Studio Code**.
2. Asegúrate de tener instalada la extensión **"Live Server"** (creada por Ritwick Dey).
3. Haz clic derecho sobre el archivo `index.html` en el explorador de archivos del IDE.
4. Selecciona la opción **"Open with Live Server"** (o presiona `Alt+L, Alt+O`).
5. Se abrirá automáticamente una pestaña en tu navegador, usualmente apuntando a `http://localhost:5500/`, con la aplicación ejecutándose en un entorno de servidor real y con recarga activa.

## Cómo Probar la Aplicación

A continuación se presentan varios escenarios representativos para validar el correcto funcionamiento de las reglas de negocio:

### Prueba 1: Aprobación Directa
1. Ingresa `14` en **Nota de 1er Bimestre**.
2. Ingresa `14` en **Nota de 2do Bimestre**.
3. Haz clic en el botón **CALCULAR**.
4. **Resultado Esperado:** El bloque de Nota Final del Semestre debe reflejar `28.00` y aparecerá un mensaje de éxito indicando que el semestre ha sido superado sin necesidad de supletorio.

### Prueba 2: Reprobación Directa (Pérdida de semestre)
1. Ingresa `6` en **Nota de 1er Bimestre**.
2. Ingresa `6` en **Nota de 2do Bimestre**.
3. Haz clic en **CALCULAR**.
4. **Resultado Esperado:** La Nota Final del Semestre mostrará `12.00` y se desplegará una alerta en color rojo lamentando la reprobación. No se dará la opción para calcular con supletorio.

### Prueba 3: Examen Supletorio - Ingreso exitoso
1. Ingresa `10` en **Nota de 1er Bimestre**.
2. Ingresa `10` en **Nota de 2do Bimestre** (sumando 20, en rango válido).
3. Haz clic en **CALCULAR**. Un mensaje de advertencia solicitará la calificación del examen supletorio.
4. Ingresa `30` en **Nota de Supletorio**.
5. Haz clic en **CALCULAR** nuevamente (o presiona la tecla `Enter`).
6. **Resultado Esperado:** Se habilitará un nuevo campo confirmando la "Nota Final de la Materia" en `25.00`. Al superar los 24 puntos requeridos, se mostrará un mensaje positivo indicando la aprobación de la asignatura.

### Prueba 4: Examen Supletorio - Reprobación
1. Ingresa `8` en **Nota de 1er Bimestre**.
2. Ingresa `8` en **Nota de 2do Bimestre** (sumando 16, en rango válido para el supletorio).
3. Ingresa `15` en **Nota de Supletorio**.
4. Haz clic en **CALCULAR**.
5. **Resultado Esperado:** La "Nota Final de la Materia" será calculada como `15.50` `((16 + 15) / 2)`. Mostrará un mensaje en pantalla indicando la reprobación del alumno incluso después del examen correspondiente.

# Skill: Probar Calculadora EPN

## Objetivo
Verificar que la Calculadora EPN funciona correctamente en el navegador.

## Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Edge o Safari)
- Acceso al sistema de archivos local

## Instrucciones Paso a Paso

### Paso 1: Localizar los Archivos
Navegar a la carpeta `Calculadora EPN` y verificar que existan los tres archivos:
- `index.html`
- `script.js`
- `styles.css`

### Paso 2: Abrir en Navegador
1. Abrir el navegador web preferido
2. Arrastrar el archivo `index.html` hacia la ventana del navegador
3. Alternativamente: clic derecho en `index.html` > "Abrir con" > seleccionar navegador

### Paso 3: Verificar Interfaz
Confirmar que la interfaz muestra:
- Título "Calculadora EPN"
- Caja de información sobre notas mínimas
- Tres campos de entrada: 1er Bimestre, 2do Bimestre, Supletorio
- Dos tarjetas de resultado
- Botón "CALCULAR"

### Paso 4: Probar Escenario - Aprobado Sin Supletorio
1. Ingresar `14` en "Nota de 1er Bimestre"
2. Ingresar `14` en "Nota de 2do Bimestre"
3. La "Nota Final del Semestre" debe mostrar `28.00`
4. Clic en "CALCULAR"
5. **Esperado**: Mensaje verde "Felicidades. Pasaste sin supletorio! :D"

### Paso 5: Probar Escenario - Aprobado Con Supletorio
1. Ingresar `10` en "Nota de 1er Bimestre"
2. Ingresar `10` en "Nota de 2do Bimestre"
3. Ingresar `20` en "Nota de Supletorio"
4. Clic en "CALCULAR"
5. **Esperado**: 
   - "Nota Final del Semestre": `20.00`
   - "Nota Final de la Materia": `20.00`
   - Mensaje verde "Felicidades, pasaste con la prueba de supletorios! :)"

### Paso 6: Probar Escenario - Reprobado
1. Ingresar `5` en "Nota de 1er Bimestre"
2. Ingresar `5` en "Nota de 2do Bimestre"
3. Clic en "CALCULAR"
4. **Esperado**: Mensaje rojo "Sorry, has reprobado la materia :("

### Paso 7: Probar Escenario - Supletorio Obligatorio
1. Ingresar `8` en "Nota de 1er Bimestre"
2. Ingresar `8` en "Nota de 2do Bimestre"
3. Dejar "Nota de Supletorio" en `0`
4. Clic en "CALCULAR"
5. **Esperado**: Mensaje amarillo "No pasas sin supletorio. Porfavor ingresa la Nota del supletorio"

### Paso 8: Probar Entrada por Teclado
1. Ingresar valores en cualquier campo
2. Presionar tecla `Enter`
3. **Esperado**: El cálculo se ejecuta como si se hubiera clicado "CALCULAR"

### Paso 9: Probar Validación de Rangos
1. Intentar ingresar `25` en "Nota de 1er Bimestre" (máximo 20)
2. **Esperado**: El valor se corrige automáticamente a `20`

### Paso 10: Probar Diseño Responsivo
1. Abrir Herramientas de Desarrollador (F12)
2. Clic en icono de dispositivo móvil
3. Redimensionar viewport a 375px de ancho
4. **Esperado**: La interfaz se adapta correctamente

## Comandos Rápidos (Consola del Navegador)
Para debugging, abrir consola con F12 y verificar:
```javascript
// Verificar que los elementos existen
document.getElementById('nota1');
document.getElementById('btnCalcular');

// Probar función de cálculo directamente
calculateNotaFinal();
```

## Criterios de Éxito
- [ ] La página carga sin errores en consola
- [ ] Los tres campos de entrada aceptan números decimales
- [ ] El cálculo de nota final es correcto (nota1 + nota2)
- [ ] Los cuatro escenarios de prueba muestran los mensajes esperados
- [ ] El diseño es legible y accesible en móvil
- [ ] Los eventos de teclado (Enter) funcionan correctamente

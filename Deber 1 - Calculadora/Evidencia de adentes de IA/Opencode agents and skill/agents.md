# Agentes y Reglas de Código - Calculadora EPN

## Arquitectura del Proyecto

### Estructura de Archivos

```
Calculadora EPN/
├── index.html    # Estructura HTML principal
├── script.js     # Lógica JavaScript
└── styles.css    # Estilos CSS
```

### Descripción de Componentes

#### index.html
- Documento HTML5 con idioma español (`lang="es"`)
- Viewport configurado para diseño responsivo
- Incluye tres archivos de entrada: `nota1`, `nota2`, `notaSupletorio`
- Muestra resultados en `notaFinal` y `notaMateria`
- Mensajes de estado en el elemento `message`

#### script.js
- **Elementos DOM**: Captura references a inputs, displays y botones
- **Funciones principales**:
  - `validateInput(input, min, max)`: Valida y limita valores de entrada
  - `showMessage(text, type)`: Muestra mensajes con estilos (success/error/warning)
  - `hideMessage()`: Oculta mensajes
  - `calculateNotaFinal()`: Calcula nota final (nota1 + nota2)
  - `calculate()`: Lógica principal de negocio
- **Eventos**: Input listeners para calculo en tiempo real, Enter key para calcular

#### styles.css
- Reset básico con `* { margin: 0; padding: 0; box-sizing: border-box; }`
- Diseño flexbox para layout principal
- Paleta de colores: Azul (#1e3a5f, #3b82f6), Rojo (#dc2626), Grises neutros
- Gradientes para cards y botones
- Transiciones suaves de 0.3s-0.4s
- Estados: hover, focus, active

---

## Reglas de Código

### HTML
1. Usar `lang="es"` para documentos en español
2. Siempre incluir `viewport` meta tag para responsividad
3. Nombres de IDs descriptivos en camelCase: `nota1`, `notaSupletorio`, `btnCalcular`
4. Inputs con atributos `min`, `max` y `step` para validación nativa

### JavaScript
1. Variables con `const` para elementos DOM
2. Funciones con nombres descriptivos en camelCase
3. Usar `parseFloat()` para cálculos numéricos
4. Validar rangos con `isNaN()` antes de procesar
5. Usar template literals para mensajes con variables
6. Formatear números con `.toFixed(2)` para 2 decimales
7. Usar clases CSS para estados (`.show`, `.success`, `.error`, `.warning`)

### CSS
1. Usar `box-sizing: border-box` global
2. Variables de colores en comentarios para referencia
3. Selectores de clase para estilos reutilizables
4. Usar `flex` para layouts horizontales
5. Transiciones para interactividad (0.3s-0.4s)
6. Sombras con `rgba()` para transparencia
7. Pseudo-clases: `:focus`, `:hover`, `:active`, `::placeholder`

### Convenciones de Nomenclatura
- **IDs**: camelCase (`notaFinal`, `notaMateriaCard`)
- **Clases CSS**: kebab-case (`.btn-calculate`, `.result-card`)
- **Funciones JS**: camelCase (`calculateNotaFinal`, `showMessage`)
- **Variables JS**: camelCase o UPPER_CASE para constantes

### Lógica de Negocio
- **Nota Final** = nota1 + nota2 (rango 0-40)
- **Pasar sin supletorio**: notaFinal >= 28
- **Reprobar**: notaFinal < 14
- **Supletorio**: (notaFinal + notaSupletorio) / 2 >= 24 para pasar

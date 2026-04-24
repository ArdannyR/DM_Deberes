# UI/UX Skill: Tema Escuela Politécnica Nacional (EPN)

## 1. Contexto de Diseño
El objetivo es refactorizar y mejorar la interfaz de usuario de esta aplicación React Native (Expo) utilizando la identidad visual de la Escuela Politécnica Nacional (EPN) de Ecuador. El diseño debe ser profesional, académico, limpio y moderno.

## 2. Paleta de Colores Institucional
Debes utilizar estrictamente esta paleta de colores para reemplazar los colores actuales en los `StyleSheet` y componentes de la aplicación:

* **Rojo EPN (Primario):** `#C8102E` (Uso: Botones principales, encabezados, íconos destacados, bordes activos).
* **Azul Oscuro EPN (Secundario):** `#002855` (Uso: Texto principal, barras de navegación, botones secundarios, etiquetas/labels).
* **Blanco (Fondo Principal):** `#FFFFFF` (Uso: Tarjetas, fondos de inputs, contenedores principales).
* **Gris Claro (Fondo Secundario):** `#F5F6FA` (Uso: Fondo general de las pantallas (`backgroundColor`), separadores).
* **Gris Oscuro (Texto Secundario):** `#5C6670` (Uso: Placeholders, descripciones, texto de apoyo).
* **Rojo Alerta/Error:** `#E31837` (Uso: Mensajes de error en validaciones).

## 3. Directrices de Estilos (Componentes)
* **Botones (`NavigationButton.tsx`):** * Los botones primarios deben tener fondo **Rojo EPN** y texto blanco.
    * Los botones secundarios deben tener fondo transparente, borde **Azul Oscuro EPN** y texto azul oscuro.
    * Añadir un ligero `borderRadius` (ej. 8px o 10px) para modernizar la interfaz.
* **Inputs (`InputField.tsx` y DatePickers):** * El `label` debe ir en **Azul Oscuro EPN**.
    * El borde en estado normal debe ser gris claro, pero al estar enfocado (activo) o validado correctamente, debe usar **Azul Oscuro EPN**.
    * Los textos de error (`errorText`) mantienen el rojo alerta.
* **Tipografía:** Usar pesos de fuente claros (`fontWeight: 'bold'` o `'600'` para títulos en Azul Oscuro, y `'regular'` para contenido).

## 4. Uso de Assets (Logotipo EPN)
La aplicación cuenta con el escudo de la universidad en la siguiente ruta: `../assets/images/epn-shield.png`.

* **Implementación:** Debes incluir esta imagen de forma destacada pero elegante. 
* **Ubicación sugerida:** En la pantalla principal (`index.tsx`), en el encabezado (Header) de la aplicación, o en la vista previa del CV (`CVPreview.tsx`) como un sello de agua discreto o logo institucional en la cabecera del documento.
* Asegúrate de importar correctamente la imagen usando `require('../assets/images/epn-shield.png')` y aplicarle un `resizeMode="contain"` con dimensiones adecuadas (ej. width: 100, height: 100).
# Prerrequisitos

## Instalar Node.js
Enlace: https://nodejs.org/en/download/current

Comprobar instalación:
```bash
node -v
```

Node.js casi siempre se instala junto con **npm**.

Comprobar npm:
```bash
npm -v
```

---

## Instalar VS Code
Enlace:  
https://code.visualstudio.com/download

---

## Instalar e iniciar TypeScript

Enlace (opciones de instalación):  
https://www.typescriptlang.org/download/

Inicializar proyecto con npm:

```bash
npm init -y
```

Instalar TypeScript como dependencia de desarrollo:

```bash
npm install typescript --save-dev
```

O instalar TypeScript de forma global:

```bash
npm install -g typescript
```

---

# Primer Hola Mundo en TypeScript

## Inicializar el proyecto de TypeScript

Crear el archivo de configuración:

```bash
npx tsc --init
```

Esto creará el archivo **tsconfig.json**.

---

## Estructura del proyecto

Dentro de la carpeta del proyecto:

```
project/
│
├── node_modules/
├── src/
├── package.json
└── tsconfig.json
```

---

## Configuración de `tsconfig.json`

Fuera de `"compilerOptions"` agregar:

```json
"include": ["src/**/*.ts"],
"exclude": ["node_modules"]
```

Dentro de `"compilerOptions"` agregar:

```json
"rootDir": "./src",
"outDir": "./dist"
```

---

## Crear el archivo TypeScript

Dentro de `src` crear un archivo `.ts`.

Ejemplo:

```
src/holaMundo.ts
```

Ejemplo de código:

```ts
console.log("Hola Mundo");
```
---

# Compilar y ejecutar archivos TypeScript

## Compilar el código TypeScript

Para compilar el código TypeScript y generar los archivos JavaScript en la carpeta `dist`, ejecuta:

```bash
npx tsc
```

Esto generará el archivo `.js` correspondiente dentro de la carpeta `dist`(configurada anteriormente).

---

## Ejecutar el archivo JavaScript compilado

Una vez compilado el código, puedes ejecutarlo con Node.js y la ruta del archvio JavaScript generado:

```bash
node dist/holaMundo.js
```

---

# Ejecutar TypeScript directamente (Opcional)

Si prefieres ejecutar el código **sin compilar manualmente**, puedes usar herramientas como `tsx` o `ts-node`.

## Instalar `tsx`

```bash
npm install tsx --save-dev
```

---

## Ejecutar el archivo TypeScript directamente

```bash
npx tsx src/holaMundo.ts
```

## Instalar `ts-node`

```bash
npm install ts-node --save-dev
```

---

## Ejecutar el archivo TypeScript directamente

```bash
npx ts-node src/holaMundo.ts
```

Esto permite ejecutar el archivo `.ts` **en un solo paso**, sin necesidad de generar previamente el archivo `.js`.
Nota: `tsx` es una herramienta más moderna y rápida que `ts-node`, por lo que se recomienda su uso para proyectos nuevos. Aun asi ambas cumplen con su cometido de ejecutar TypeScript directamente.
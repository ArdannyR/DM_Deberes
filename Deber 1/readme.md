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
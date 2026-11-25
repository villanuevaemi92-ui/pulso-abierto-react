
# Pulso Abierto

Aplicación web desarrollada con React y TypeScript que consulta la API de CoinGecko y permite visualizar los precios en USD de Bitcoin, Ethereum y Solana.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Zod
- CSS
- API de CoinGecko

## Funcionalidades

- Consulta y visualización de Bitcoin, Ethereum y Solana.
- Búsqueda y filtros de criptomonedas.
- Validación de entradas mediante Zod.
- Navegación a páginas de detalle.
- Acceso directo a las rutas de detalle.
- Página para rutas inexistentes.
- Estados de carga, resultado, ausencia de datos y error.
- Diseño adaptable y navegación mediante teclado.

## Requisitos previos

- Node.js
- npm

## Instalación

1. Abrir una terminal en la carpeta raíz del proyecto.
2. Instalar las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Compilar para producción

```bash
npm run build
```

La compilación genera la carpeta `dist`.

## Previsualizar la versión compilada

```bash
npm run preview
```

## API utilizada

CoinGecko:

https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd

La aplicación consulta los precios de Bitcoin, Ethereum y Solana en dólares estadounidenses (USD).

## Entrega

El proyecto incluye el código fuente, estilos, recursos, archivos de configuración y dependencias declaradas en `package.json` y `package-lock.json`.

La carpeta `node_modules` no se incluye en el archivo ZIP. Para instalar las dependencias, ejecutar `npm install`.


## Mejora de mantenibilidad – Módulo 4

**Problema identificado:**
El tipo `Crypto` estaba definido nuevamente dentro de `CryptoList.tsx`, aunque ya existía una definición compartida en `src/types/crypto.ts`.

**Modificación realizada:**
Se eliminó la interfaz duplicada de `CryptoList.tsx` y se reutilizó el tipo centralizado mediante la importación `import type { Crypto } from "./types/crypto"`.

**Beneficio:**
Se evita mantener definiciones duplicadas y se facilita la actualización y consistencia de los tipos de datos de la aplicación.

**Verificación:**
Se comprobará que el proyecto compile correctamente y que las pruebas automatizadas continúen funcionando, sin alterar el comportamiento de la aplicación.

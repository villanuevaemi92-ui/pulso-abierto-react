
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

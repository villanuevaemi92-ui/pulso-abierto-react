
# Pulso Abierto

Aplicación web desarrollada con React y TypeScript que consulta la API de CoinGecko y permite visualizar los precios en USD de Bitcoin, Ethereum y Solana.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Zustand
- Zod
- Vitest
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
- Gestión y persistencia de criptomonedas favoritas.
- Diseño adaptable y navegación mediante teclado.

## Requisitos previos

- Node.js
- npm

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/villanuevaemi92-ui/pulso-abierto-react.git
```

Ingresar a la carpeta del proyecto:

```bash
cd pulso-abierto-react
```

Instalar las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

Para iniciar el servidor local:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

## Ejecutar las pruebas

Para ejecutar todas las pruebas automatizadas una sola vez:

```bash
npm run test:run
```

## Compilar para producción

Para comprobar el código TypeScript y generar la versión optimizada:

```bash
npm run build
```

La compilación genera la carpeta `dist`.

## Previsualizar la versión compilada

Después de generar el build, ejecutar:

```bash
npm run preview
```

Vite mostrará la dirección local para comprobar la versión de producción.

## API utilizada

CoinGecko:

https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd

La aplicación consulta los precios de Bitcoin, Ethereum y Solana en dólares estadounidenses (USD).

## Aplicación publicada

La aplicación se encuentra desplegada en Vercel:

https://pulso-abierto-react-seven.vercel.app/

## Variables de entorno

Actualmente, el proyecto no requiere variables de entorno propias. La consulta de precios se realiza mediante la API pública de CoinGecko.

No se publican claves privadas ni credenciales en el repositorio.

## Entrega

El proyecto incluye el código fuente, estilos, recursos, archivos de configuración y dependencias declaradas en `package.json` y `package-lock.json`.

La carpeta `node_modules` no se incluye en el archivo ZIP. Para instalar las dependencias, ejecutar `npm install`.

## Mejora de mantenibilidad – Módulo 4

**Problema identificado:**

El tipo `Crypto` estaba definido nuevamente dentro de `CryptoList.tsx`, aunque ya existía una definición compartida en `src/types/crypto.ts`.

**Modificación realizada:**

Se eliminó la interfaz duplicada de `CryptoList.tsx` y se reutilizó el tipo centralizado mediante la importación:

```typescript
import type { Crypto } from "./types/crypto";
```

**Beneficio:**

Se evita mantener definiciones duplicadas y se facilita la actualización y consistencia de los tipos de datos de la aplicación.

**Verificación:**

Se comprobó que el proyecto compile correctamente mediante `npm run build` y que las pruebas automatizadas finalicen correctamente mediante `npm run test:run`, sin alterar el comportamiento de la aplicación.

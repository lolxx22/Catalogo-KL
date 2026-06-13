# KL Catalogo

Catalogo web de KL con frontend estatico y backend Express preparado para despliegue en Vercel.

## Comandos

```bash
npm install
npm run dev
npm run build
npm start
```

## Desarrollo

`npm run dev` inicia el servidor local en `http://localhost:3000`.

## Produccion

`npm run build` compila TypeScript en `dist/` y `npm start` ejecuta el servidor compilado.

## Vercel

El entrypoint serverless esta en `api/index.ts`. Vercel usa `vercel.json` para enviar las rutas al backend Express, que sirve las paginas HTML y los assets de `frontend/`.

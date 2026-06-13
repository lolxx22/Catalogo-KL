import fs from 'fs';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;
const rootPath = process.cwd();
const frontendPath = path.join(rootPath, 'frontend');
const htmlPath = path.join(frontendPath, 'html');

function sendHtml(fileName: string) {
  return (_req: Request, res: Response): void => {
    res.sendFile(path.join(htmlPath, fileName));
  };
}

app.disable('x-powered-by');
app.use(express.static(frontendPath));

app.get('/', sendHtml('index.html'));
app.get('/catalogo', sendHtml('catalogo.html'));
app.get('/accesorios', sendHtml('accesorios.html'));
app.get('/belleza', sendHtml('belleza.html'));
app.get('/hogar', sendHtml('hogar.html'));
app.get('/deportes', sendHtml('deportes.html'));
app.get('/tecnologia', sendHtml('tecnologia.html'));
app.get('/ropa', sendHtml('ropa.html'));

app.get('/:page', (req: Request, res: Response, next: NextFunction): void => {
  const pageName = `${req.params.page}.html`;
  const pagePath = path.join(htmlPath, pageName);

  if (fs.existsSync(pagePath)) {
    res.sendFile(pagePath);
    return;
  }

  next();
});

app.use((_req: Request, res: Response): void => {
  res.status(404).sendFile(path.join(htmlPath, 'index.html'));
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('[server:error]', error);
  res.status(500).json({ message: 'Error interno del servidor' });
});

if (require.main === module && process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Servidor KL listo en http://localhost:${port}`);
  });
}

export default app;

import express, { Request, Response } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'direct~chat',
    timestamp: new Date().toISOString()
  });
});

// Download standalone HTML file
app.get('/download-html', (_req: Request, res: Response) => {
  const filePath = path.join(__dirname, 'public', 'direct-chat.html');
  res.download(filePath, 'direct-chat.html', (err) => {
    if (err) {
      res.status(500).send('Error downloading file');
    }
  });
});

// Mount Vite in development or serve static assets in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    // HMR is disabled in AI Studio container environment (DISABLE_HMR=true)
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  server.listen(port, '0.0.0.0', () => {
    console.log(`direct~chat Server running at http://0.0.0.0:${port}`);
  });
}

startServer();

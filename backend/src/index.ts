import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { contactRouter } from './routes/contactRoutes.js';

const app = express();

// Behind Vercel's proxy: trust one hop so rate limiting sees the real client IP.
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigins,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'prachi-sirola-portfolio-backend',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contact', contactRouter);
app.use(errorHandler);

// Vercel runs the exported app itself; only listen for local dev / self-hosting.
if (!process.env.VERCEL) {
  app.listen(env.port, () => {
    console.log(`Portfolio backend running on http://localhost:${env.port}`);
  });
}

export default app;

import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5001),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  emailFrom: process.env.EMAIL_FROM || 'no-reply@prachisirola.dev',
  emailTo: process.env.EMAIL_TO || 'prachisirola07@gmail.com',
};

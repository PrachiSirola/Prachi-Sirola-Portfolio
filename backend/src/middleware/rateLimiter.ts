import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please try again in 15 minutes.',
  },
});

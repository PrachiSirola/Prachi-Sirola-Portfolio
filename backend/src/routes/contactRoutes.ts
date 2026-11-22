import { Router, type NextFunction, type Request, type Response } from 'express';
import { z } from 'zod';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { sendContactEmail } from '../services/emailService.js';
import { sanitizePlainText } from '../utils/sanitize.js';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.'),
  email: z.string().trim().email('Please provide a valid email address.').max(160),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(3000, 'Message must be under 3000 characters.'),
  website: z.string().optional().default(''), // Honeypot field
});

export const contactRouter = Router();

contactRouter.post(
  '/',
  contactRateLimiter,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = contactSchema.parse(req.body);

      // Silently accept honeypot-triggered spam bots without sending email
      if (parsed.website.trim().length > 0) {
        res.status(200).json({
          success: true,
          message: 'Thank you for reaching out. Your message has been received.',
        });
        return;
      }

      const cleanPayload = {
        name: sanitizePlainText(parsed.name),
        email: parsed.email.toLowerCase(),
        message: sanitizePlainText(parsed.message),
      };

      await sendContactEmail(cleanPayload);

      res.status(200).json({
        success: true,
        message: 'Message sent successfully. I will get back to you soon.',
      });
    } catch (error) {
      next(error);
    }
  }
);

import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: err.errors[0]?.message || 'Invalid form input.',
      errors: err.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server. Please email prachisirola07@gmail.com directly.',
  });
}

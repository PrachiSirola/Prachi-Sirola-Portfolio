import type { ContactPayload, ContactResponse } from '../types/portfolio';

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) || '';
const AI_SERVICE_BASE = (import.meta.env.VITE_AI_SERVICE_URL as string | undefined) || '';

export async function submitContactForm(payload: ContactPayload): Promise<ContactResponse> {
  const endpoint = `${API_BASE}/api/contact`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as ContactResponse | null;

  if (!response.ok) {
    throw new Error(
      data?.message || 'Unable to send your message right now. Please try emailing directly.'
    );
  }

  return data ?? { success: true, message: 'Message sent successfully.' };
}

export interface LiveAiDemoResult {
  sql: string;
  insight: string;
  engine: string;
  latencyMs: number;
}

/**
 * Optional call to the Python FastAPI AI service.
 * Returns null if the service is not running so the portfolio degrades gracefully.
 */
export async function queryOptionalAiService(prompt: string): Promise<LiveAiDemoResult | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(`${AI_SERVICE_BASE}/api/ai/demo-query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data = (await response.json()) as LiveAiDemoResult;
    return data;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

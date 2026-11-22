/**
 * Strips HTML tags and escapes control characters to prevent injection in logs and HTML emails.
 */
export function sanitizePlainText(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

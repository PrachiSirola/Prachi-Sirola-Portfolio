import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { submitContactForm } from '../../services/api';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot anti-spam trap
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please share a brief message (at least 10 characters).';
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        website,
      });
      setStatus('success');
      setFeedback(response.message);
      setName('');
      setEmail('');
      setMessage('');
      setWebsite('');
    } catch (err) {
      setStatus('error');
      setFeedback(
        err instanceof Error
          ? err.message
          : 'Could not reach the contact server. Please email prachisirola07@gmail.com directly.'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot field hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className="w-full border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-base text-paper transition-colors duration-300 placeholder:text-paper/40 focus:border-terra focus:outline-none focus:ring-0"
          />
          {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className="w-full border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-base text-paper transition-colors duration-300 placeholder:text-paper/40 focus:border-terra focus:outline-none focus:ring-0"
          />
          {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Tell me about the role, project, or engineering problem..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          className="w-full resize-none border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-base text-paper transition-colors duration-300 placeholder:text-paper/40 focus:border-terra focus:outline-none focus:ring-0"
        />
        {errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message}</p>}
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="flex items-start gap-2.5 border border-emerald-400/50 bg-emerald-400/10 px-3.5 py-2.5 text-xs text-emerald-200"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2.5 border border-rose-400/50 bg-rose-400/10 px-3.5 py-2.5 text-xs text-rose-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-terra px-6 py-3 text-xs font-semibold tracking-[0.08em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

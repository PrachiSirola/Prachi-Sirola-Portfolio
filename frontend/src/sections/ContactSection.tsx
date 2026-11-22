import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactForm } from '../components/ui/ContactForm';
import { ContactIllustration } from '../components/ui/ContactIllustration';
import { EDITORIAL_EASE, viewportConfig } from '../utils/motion';

const LINES = [
  { text: "LET'S CREATE", className: 'text-ink' },
  { text: 'SOMETHING GREAT', className: 'text-terra' },
];

const DETAILS = [
  { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
  { icon: Phone, label: 'Phone', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/prachi-sirola', href: PERSONAL_INFO.linkedin },
  { icon: Github, label: 'GitHub', value: 'github.com/PrachiSirola', href: PERSONAL_INFO.github },
  { icon: MapPin, label: 'Location', value: PERSONAL_INFO.location },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-ink/25 py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-serif text-[clamp(2.6rem,9vw,7rem)] font-normal uppercase leading-[0.92] tracking-tight"
        >
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-1">
              <motion.span
                variants={{
                  hidden: { y: '108%' },
                  visible: { y: '0%', transition: { duration: 0.9, delay: i * 0.1, ease: EDITORIAL_EASE } },
                }}
                className={`block ${line.className}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.9, delay: 0.2, ease: EDITORIAL_EASE }}
          className="mt-12 grid overflow-hidden rounded-[28px] bg-ink shadow-[0_40px_90px_-30px_rgba(20,18,16,0.6)] md:grid-cols-2"
        >
          <div className="relative min-h-[340px] bg-gradient-to-br from-[#D9694A] via-[#C65D3E] to-[#8E3B22] p-4 md:min-h-[560px]">
            <ContactIllustration />
          </div>

          <div className="flex flex-col p-8 sm:p-12">
            <h3 className="font-sans text-5xl font-light tracking-tight text-paper sm:text-6xl">Contact Us</h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/75">
              Have a role, a project, or an engineering problem in mind? Send a message and it lands straight in my
              inbox. I am an immediate joiner and happy to talk.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {DETAILS.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-terra text-paper">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">{label}</span>
                      <span className="block break-words text-sm font-medium text-paper">{value}</span>
                    </span>
                  </>
                );
                const cls = 'flex min-h-[64px] items-center gap-3 rounded-2xl border border-paper/15 bg-paper/5 p-3';
                return (
                  <li key={label} className={label === 'Email' ? 'sm:col-span-2' : ''}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noreferrer' : undefined}
                        className={`${cls} transition-colors hover:border-terra hover:bg-terra/15`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </li>
                );
              })}
              <li>
                <a
                  href={PERSONAL_INFO.resumePath}
                  download="Prachi_Sirola_Resume.pdf"
                  className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-paper bg-paper p-3 text-ink transition-colors hover:bg-[#E8D44D]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper">
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">Download Resume</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

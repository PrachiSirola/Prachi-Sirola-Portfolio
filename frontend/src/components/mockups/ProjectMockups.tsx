import {
  Bell,
  CheckCircle2,
  FileText,
  Globe,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { ProjectMockupType } from '../../types/portfolio';

export function ProjectVisualMockup({ type }: { type: Exclude<ProjectMockupType, 'datalens'> }) {
  switch (type) {
    case 'attendance':
      return <AttendanceMockup />;
    case 'vastra':
      return <VastraMockup />;
    case 'ecommerce-suite':
      return <EcommerceSuiteMockup />;
    case 'datasheet-rag':
      return <DatasheetRagMockup />;
    case 'ticket-system':
      return <TicketSystemMockup />;
  }
}

function AttendanceMockup() {
  const bars = [72, 86, 94, 91, 96, 88, 95];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="flex h-56 flex-col justify-between rounded-lg border border-white/[0.08] bg-[#090B0F] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-silver-300" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-silver-200">
            Tenant Analytics · IN / DXB
          </span>
        </div>
        <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-silver-300">
          ~1M Records
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Active Orgs', val: '50–500 / org' },
          { label: 'Shift Sync', val: 'Selfie + RBAC' },
          { label: 'Bot Alerts', val: 'Telegram Live' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded border border-white/[0.07] bg-[#10131A] px-2.5 py-2"
          >
            <div className="text-[9px] uppercase tracking-wider text-silver-500">{item.label}</div>
            <div className="mt-0.5 font-mono text-[11px] font-medium text-silver-100">
              {item.val}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-2 pt-1">
        <div className="flex flex-1 items-end gap-1.5">
          {bars.map((height, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-16 w-full items-end rounded-[2px] bg-white/[0.04]">
                <div
                  style={{ height: `${height}%` }}
                  className="w-full rounded-[2px] bg-gradient-to-t from-slate-600/60 to-slate-200/90"
                />
              </div>
              <span className="font-mono text-[8px] text-silver-500">{days[i]}</span>
            </div>
          ))}
        </div>
        <div className="hidden w-36 rounded border border-white/[0.08] bg-[#10131A] p-2 sm:block">
          <div className="flex items-center gap-1 font-mono text-[9px] text-silver-300">
            <Bell className="h-2.5 w-2.5" />
            Telegraf Bot
          </div>
          <p className="mt-1 text-[10px] leading-snug text-silver-400">
            Shift A check-ins verified with Cloudinary selfie proof.
          </p>
        </div>
      </div>
    </div>
  );
}

function VastraMockup() {
  return (
    <div className="flex h-56 flex-col justify-between rounded-lg border border-white/[0.08] bg-[#090B0F] p-4">
      <div className="flex items-center justify-between">
        <span className="font-serif text-sm tracking-wide text-silver-100">VASTRA · B2B</span>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-silver-300">
          <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">INR</span>
          <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">USD</span>
          <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">AED</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-md border border-white/[0.08] bg-[#10131A] p-3">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-silver-400">
            <span>CJ Catalog Sync</span>
            <RefreshCw className="h-3 w-3 text-silver-300" />
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-4/5 rounded-full bg-silver-200" />
          </div>
          <div className="mt-1.5 font-mono text-[9px] text-silver-500">
            Redis checkpoint resumable
          </div>
        </div>

        <div className="rounded-md border border-white/[0.08] bg-[#10131A] p-3">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-silver-400">
            <span>Auth & Checkout</span>
            <Lock className="h-3 w-3 text-silver-300" />
          </div>
          <div className="mt-2 space-y-1 font-mono text-[10px] text-silver-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-silver-300" />
              TOTP 2FA + CAPTCHA
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-silver-300" />
              Razorpay Verified
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-silver-400">
        <span>NestJS · React 19 · MongoDB · Redis</span>
        <span className="text-silver-200">Wholesale Ready</span>
      </div>
    </div>
  );
}

function EcommerceSuiteMockup() {
  const stores = ['Storefront 01', 'Storefront 02', 'Storefront 10+'];

  return (
    <div className="flex h-56 flex-col justify-between rounded-lg border border-white/[0.08] bg-[#090B0F] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-silver-300">
          <Globe className="h-3.5 w-3.5" />
          Multi-Store Core
        </div>
        <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-silver-200">
          <ShieldCheck className="h-3 w-3" />
          IDOR Remediated
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stores.map((store, idx) => (
          <div
            key={store}
            className="rounded-md border border-white/[0.09] bg-gradient-to-b from-[#151922] to-[#0D1016] p-2.5"
          >
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            </div>
            <div className="mt-2.5 font-mono text-[10px] text-silver-100">{store}</div>
            <div className="mt-1 h-1 w-3/4 rounded bg-white/15" />
            <div className="mt-1 h-1 w-1/2 rounded bg-white/10" />
            <div className="mt-2 font-mono text-[8px] text-silver-500">
              {idx === 2 ? 'Next.js Template' : 'Stripe + CJ'}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded border border-white/[0.08] bg-[#10131A] px-3 py-2 font-mono text-[10px] text-silver-300">
        <span className="inline-flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-silver-400" />
          Cache Layer: Redis &rarr; MongoDB Fallback
        </span>
        <span className="text-silver-500">HA</span>
      </div>
    </div>
  );
}

function DatasheetRagMockup() {
  return (
    <div className="flex h-56 flex-col justify-between rounded-lg border border-white/[0.08] bg-[#090B0F] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-silver-300">
          <FileText className="h-3.5 w-3.5" />
          STM32_Datasheet.pdf · Table Chunking
        </div>
        <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-silver-300">
          Guardrails Active
        </span>
      </div>

      <div className="grid grid-cols-12 gap-2.5">
        {/* Document Table Snippet */}
        <div className="col-span-6 rounded border border-white/[0.08] bg-[#10131A] p-2.5 font-mono text-[9px]">
          <div className="mb-1.5 text-silver-400">Extracted Table · p.42</div>
          <div className="grid grid-cols-3 border-b border-white/10 pb-1 text-silver-500">
            <span>PIN</span>
            <span>VDD</span>
            <span>MAX</span>
          </div>
          <div className="mt-1 grid grid-cols-3 text-silver-200">
            <span>PA0</span>
            <span>3.3V</span>
            <span>3.6V</span>
          </div>
          <div className="mt-1 grid grid-cols-3 text-silver-200">
            <span>PB5</span>
            <span>3.3V</span>
            <span>5.0V*</span>
          </div>
        </div>

        {/* RAG Agent Output */}
        <div className="col-span-6 flex flex-col justify-between rounded border border-white/[0.08] bg-[#0C0F14] p-2.5">
          <div className="font-mono text-[9px] text-silver-400">ChromaDB · Top-K = 3</div>
          <p className="mt-1 text-[10px] leading-relaxed text-silver-200">
            Pin PB5 is 5V-tolerant (FT) under absolute max ratings; PA0 requires &le;3.6V.
          </p>
          <div className="mt-1.5 font-mono text-[8px] text-silver-500">
            Ollama Local · Tool Agent
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9px] text-silver-500">
        <span>Prompt-injection filter: PASS</span>
        <span>LangChain · FastAPI · ChromaDB</span>
      </div>
    </div>
  );
}

function TicketSystemMockup() {
  const columns = [
    {
      title: 'Open',
      items: ['RBAC role guard', 'CSV audit export'],
    },
    {
      title: 'In Progress',
      items: ['Brevo status mail', 'Cursor pagination'],
    },
    {
      title: 'Resolved',
      items: ['Project scoping', 'Render deploy'],
    },
  ];

  return (
    <div className="flex h-56 flex-col justify-between rounded-lg border border-white/[0.08] bg-[#090B0F] p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-silver-200">
          Issue Board · Project ACL
        </span>
        <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-silver-400">
          Vercel + Render
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {columns.map((col) => (
          <div key={col.title} className="rounded border border-white/[0.07] bg-[#10131A] p-2">
            <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase text-silver-400">
              <span>{col.title}</span>
              <span className="text-silver-500">{col.items.length}</span>
            </div>
            <div className="space-y-1.5">
              {col.items.map((ticket) => (
                <div
                  key={ticket}
                  className="rounded border border-white/[0.06] bg-[#090B0F] px-2 py-1.5 text-[10px] text-silver-200"
                >
                  {ticket}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[9px] text-silver-500">
        <span>Status history & search enabled</span>
        <span>Brevo SMTP Notifications</span>
      </div>
    </div>
  );
}

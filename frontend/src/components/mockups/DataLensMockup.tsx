import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Play, Sparkles, Terminal } from 'lucide-react';
import { DATALENS_SAMPLE_QUERIES } from '../../data/portfolioData';
import { queryOptionalAiService } from '../../services/api';

export function DataLensMockup() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [liveSql, setLiveSql] = useState<string | null>(null);
  const [liveInsight, setLiveInsight] = useState<string | null>(null);
  const [liveEngine, setLiveEngine] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const activeSample = DATALENS_SAMPLE_QUERIES[activeIdx];

  async function handleSelectQuery(index: number) {
    setActiveIdx(index);
    setLiveSql(null);
    setLiveInsight(null);
    setLiveEngine(null);

    const sample = DATALENS_SAMPLE_QUERIES[index];
    setIsQuerying(true);
    const liveResult = await queryOptionalAiService(sample.prompt);
    if (liveResult) {
      setLiveSql(liveResult.sql);
      setLiveInsight(liveResult.insight);
      setLiveEngine(liveResult.engine);
    }
    setIsQuerying(false);
  }

  const displayedSql = liveSql ?? activeSample.sql;
  const displayedInsight = liveInsight ?? activeSample.insight;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0C10] shadow-card-dark">
      {/* Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#10131A] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[11px] text-silver-300">
            DataLensAI · Local Analyst Workspace
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-silver-400">
          <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-silver-200">
            <Cpu className="h-3 w-3" />
            {liveEngine ?? 'Qwen 2.5 7B · Ollama'}
          </span>
          <span className="hidden items-center gap-1 rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 sm:inline-flex">
            <Database className="h-3 w-3" />
            DuckDB Isolated
          </span>
        </div>
      </div>

      {/* Natural Language Prompt Bar & Sample Selector */}
      <div className="border-b border-white/[0.07] bg-[#0D1016] p-4">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/12 bg-[#080A0E] px-3.5 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-silver-200" />
            <p className="truncate font-mono text-xs text-silver-100">{activeSample.prompt}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-silver-200">
            <Play className="h-2.5 w-2.5 fill-current" />
            {isQuerying ? 'Running' : `${activeSample.latencyMs}ms`}
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-silver-500">
            Sample Prompts:
          </span>
          {DATALENS_SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => void handleSelectQuery(idx)}
              className={`rounded border px-2 py-0.5 font-mono text-[10px] transition-colors ${
                idx === activeIdx
                  ? 'border-white/30 bg-white/10 text-white'
                  : 'border-white/[0.08] bg-transparent text-silver-400 hover:border-white/20 hover:text-silver-200'
              }`}
            >
              Query 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: SQL + Chart + AI Analysis */}
      <div className="grid gap-4 p-4 lg:grid-cols-12">
        {/* SQL Output */}
        <div className="min-w-0 rounded-lg border border-white/[0.08] bg-[#07080B] p-3.5 lg:col-span-7">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-silver-400">
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Terminal className="h-3 w-3 text-silver-300" />
              Generated DuckDB SQL
            </span>
            <span className="font-mono text-silver-500">85/85 Benchmark Verified</span>
          </div>
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-silver-200">
            <code>{displayedSql}</code>
          </pre>
        </div>

        {/* Data Visualization Panel */}
        <div className="flex min-w-0 flex-col justify-between rounded-lg border border-white/[0.08] bg-[#0D1016] p-3.5 lg:col-span-5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-silver-400">
            <span>Query Visualization</span>
            <span className="font-mono text-silver-500">{activeSample.rowsScanned}</span>
          </div>

          <div className="my-4 flex h-28 items-end justify-between gap-2.5 px-1">
            {activeSample.chartData.map((bar) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-mono text-[9px] text-silver-300">{bar.display}</span>
                <div className="flex h-20 w-full items-end rounded-sm bg-white/[0.04] p-0.5">
                  <motion.div
                    key={`${activeSample.id}-${bar.label}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.value}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-[2px] bg-gradient-to-t from-slate-500/70 via-slate-300/85 to-white"
                  />
                </div>
                <span className="font-mono text-[9px] text-silver-500">{bar.label}</span>
              </div>
            ))}
          </div>

          {/* AI Insight Panel */}
          <div className="rounded-md border border-white/[0.08] bg-[#090B0F] p-2.5">
            <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-silver-300">
              <Sparkles className="h-3 w-3" />
              AI Analysis Summary
            </div>
            <p className="text-[11px] leading-relaxed text-silver-300">{displayedInsight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { CorrelationProgressState } from "@/types/correlation";
import {
  Fingerprint,
  Search,
  Globe,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Radio,
  Network,
  GitFork,
  AlertTriangle,
  FolderGit2
} from "lucide-react";

interface CorrelationLiveAnimationProps {
  progress: CorrelationProgressState;
  subjectName: string;
}

export function CorrelationLiveAnimation({
  progress,
  subjectName,
}: CorrelationLiveAnimationProps) {
  const STAGES = [
    { name: "Initializing correlation investigation...", short: "INIT" },
    { name: "Collecting public source evidence...", short: "SOURCES" },
    { name: "Normalizing platform entities...", short: "NORMALIZE" },
    { name: "Extracting identity signals...", short: "SIGNALS" },
    { name: "Comparing cross-platform attributes...", short: "COMPARE" },
    { name: "Resolving usernames and aliases...", short: "ALIASES" },
    { name: "Checking organization relationships...", short: "ORGS" },
    { name: "Checking project relationships...", short: "PROJECTS" },
    { name: "Checking timeline consistency...", short: "TIMELINE" },
    { name: "Detecting conflicting evidence...", short: "CONFLICTS" },
    { name: "Building correlation graph...", short: "GRAPH" },
    { name: "Generating explainable correlation report...", short: "REPORT" }
  ];

  const currentStageIndex = STAGES.findIndex(s => s.name === progress.current_stage);
  const activeIdx = currentStageIndex >= 0 ? currentStageIndex : (progress.progress_percent === 100 ? 11 : Math.min(11, Math.floor((progress.progress_percent / 100) * 12)));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden my-6">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Radio className="w-3 h-3 text-blue-400 animate-pulse" />
              Checkpoint 3 Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Case 3 — Multi-Platform Correlation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
            Correlating Multi-Platform Footprint
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Autonomous multi-signal cross-platform correlation for <strong className="text-blue-300 font-semibold">{subjectName}</strong>
          </p>
        </div>

        {/* Live Progress Ring / Badge */}
        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 px-4 py-2.5 rounded-2xl shadow-inner shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-10 h-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-slate-700"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-blue-500 transition-all duration-500 ease-out"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={100 - progress.progress_percent}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[11px] font-mono font-bold text-blue-400">
              {progress.progress_percent}%
            </span>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pipeline Stage</div>
            <div className="text-xs font-semibold text-slate-200">{progress.current_stage}</div>
          </div>
        </div>
      </div>

      {/* Main Animation Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center relative z-10">
        {/* Left: Fingerprint Pulse Visualizer */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 border border-slate-800 rounded-2xl relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Animated Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping duration-1000" />
            <div className="absolute -inset-4 rounded-full border border-indigo-500/10 animate-pulse duration-1000" />
            
            {/* Center Biometric Beacon */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Fingerprint className="w-14 h-14 text-white animate-pulse" />
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/60">
              Correlation Engine Active
            </span>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Normalizing independent platform graphs. Preserving strict uncertainty.
            </p>
          </div>
        </div>

        {/* Right: Live Correlation Backend Counters */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Evidence Sources
              </div>
              <div className="text-2xl font-mono font-bold text-blue-400 mt-1">
                {progress.evidence_sources || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Search className="w-3.5 h-3.5 text-indigo-400" /> Signals Compared
              </div>
              <div className="text-2xl font-mono font-bold text-indigo-400 mt-1">
                {progress.signals_compared || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Network className="w-3.5 h-3.5 text-emerald-400" /> Relationships
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                {progress.relationships_found || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Conflicts
              </div>
              <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
                {progress.conflicts_count || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Stage Progress Stepper Bar */}
      <div className="mt-8 pt-6 border-t border-slate-800 relative z-10">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          Autonomous Correlation Pipeline (12 Stages)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {STAGES.map((stg, idx) => {
            const isDone = idx < activeIdx || progress.progress_percent === 100;
            const isCurrent = idx === activeIdx && progress.progress_percent < 100;

            return (
              <div
                key={stg.name}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isDone
                    ? "bg-blue-950/40 border-blue-500/40 text-blue-300"
                    : isCurrent
                    ? "bg-blue-600/20 border-blue-400 text-white animate-pulse"
                    : "bg-slate-950/40 border-slate-800/60 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  ) : isCurrent ? (
                    <Radio className="w-3 h-3 text-blue-400 animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-[11px] font-bold leading-tight truncate">{stg.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

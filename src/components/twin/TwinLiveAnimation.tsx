"use client";

import React from "react";
import { TwinProgressState } from "@/types/twin";
import {
  Fingerprint,
  Search,
  Globe,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Radio,
  Users2,
  GitFork,
  AlertTriangle,
  SplitSquareVertical
} from "lucide-react";

interface TwinLiveAnimationProps {
  progress: TwinProgressState;
  personAName: string;
  personBName: string;
}

export function TwinLiveAnimation({
  progress,
  personAName,
  personBName,
}: TwinLiveAnimationProps) {
  const STAGES = [
    { name: "Initializing twin investigation...", short: "INIT" },
    { name: "Validating consented reference images...", short: "IMAGES" },
    { name: "Detecting subjects...", short: "DETECT" },
    { name: "Extracting supporting visual signals...", short: "VISUAL" },
    { name: "Comparing visual characteristics...", short: "FEATURES" },
    { name: "Normalizing subject context...", short: "CONTEXT" },
    { name: "Searching authorized public evidence...", short: "SEARCH" },
    { name: "Comparing names and aliases...", short: "NAMES" },
    { name: "Comparing organizations and domains...", short: "ORGS" },
    { name: "Comparing public profiles...", short: "PROFILES" },
    { name: "Checking projects and events...", short: "PROJECTS" },
    { name: "Checking timeline consistency...", short: "TIMELINE" },
    { name: "Detecting contradictory evidence...", short: "CONFLICTS" },
    { name: "Running false-match analysis...", short: "FALSE-MATCH" },
    { name: "Fusing independent evidence...", short: "FUSION" },
    { name: "Generating explainable twin report...", short: "REPORT" }
  ];

  const currentStageIndex = STAGES.findIndex(s => s.name === progress.current_stage);
  const activeIdx = currentStageIndex >= 0 ? currentStageIndex : (progress.progress_percent === 100 ? 15 : Math.min(15, Math.floor((progress.progress_percent / 100) * 16)));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden my-6">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
              TwinGuard Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Two-Subject Disambiguation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
            Running Twin & False-Match Analysis
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Comparing <strong className="text-blue-300 font-semibold">{personAName || "Person A"}</strong> and <strong className="text-indigo-300 font-semibold">{personBName || "Person B"}</strong> across independent public evidence
          </p>
        </div>

        {/* Live Progress Ring */}
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
                className="stroke-purple-500 transition-all duration-500 ease-out"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={100 - progress.progress_percent}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[11px] font-mono font-bold text-purple-400">
              {progress.progress_percent}%
            </span>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Investigation Stage</div>
            <div className="text-xs font-semibold text-slate-200 truncate max-w-[180px]">{progress.current_stage}</div>
          </div>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center relative z-10">
        {/* Left: Dual Biometric Radar Beacon */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 border border-slate-800 rounded-2xl relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping duration-1000" />
            <div className="absolute -inset-4 rounded-full border border-blue-500/10 animate-pulse duration-1000" />
            
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <SplitSquareVertical className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60">
              Anti-False-Match Engine
            </span>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Evaluating multi-signal corroboration. Visual similarity is not proof.
            </p>
          </div>
        </div>

        {/* Right: Live Signal Counters */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Search className="w-3.5 h-3.5 text-blue-400" /> Signals Compared
              </div>
              <div className="text-2xl font-mono font-bold text-blue-400 mt-1">
                {progress.signals_compared || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Contradictions
              </div>
              <div className="text-2xl font-mono font-bold text-rose-400 mt-1">
                {progress.contradictions_found || 0}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Evidence Sources
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                {progress.evidence_sources || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 14-Stage Progress Stepper Bar */}
      <div className="mt-8 pt-6 border-t border-slate-800 relative z-10">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          Autonomous Twin Pipeline Stages (16 Stages)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STAGES.map((stg, idx) => {
            const isDone = idx < activeIdx || progress.progress_percent === 100;
            const isCurrent = idx === activeIdx && progress.progress_percent < 100;

            return (
              <div
                key={stg.name}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isDone
                    ? "bg-purple-950/40 border-purple-500/40 text-purple-300"
                    : isCurrent
                    ? "bg-purple-600/20 border-purple-400 text-white animate-pulse"
                    : "bg-slate-950/40 border-slate-800/60 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  ) : isCurrent ? (
                    <Radio className="w-3 h-3 text-purple-400 animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-[10px] font-bold leading-tight truncate">{stg.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

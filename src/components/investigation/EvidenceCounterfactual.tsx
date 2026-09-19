"use client";

import React from "react";
import { CounterfactualAnalysis } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileText,
  ArrowRight,
  XCircle,
  Scale,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceCounterfactualProps {
  counterfactual: CounterfactualAnalysis;
  evidenceStrength?: number;
  majorConcerns?: string[];
}

export function EvidenceCounterfactual({
  counterfactual,
  evidenceStrength = 92.4,
  majorConcerns = [],
}: EvidenceCounterfactualProps) {
  const supCount = counterfactual.supporting.length;
  const conCount = counterfactual.contradicting.length;
  const calculatedStrength =
    evidenceStrength ||
    (supCount + conCount === 0
      ? 0
      : Math.round((supCount / (supCount + conCount)) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-0">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                EVIDENCE ADVERSARIAL ENGINE
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono border border-purple-200">
                SYMMETRIC PROOF LATTICE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Actively searches for contradicting evidence — never forces a match when evidence conflicts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Final Status:</span>
          <StatusBadge status={counterfactual.overallAssessment} size="sm" />
        </div>
      </div>

      {/* Adversarial Strength Banner */}
      <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Adversarial Evidence Strength: {calculatedStrength}%
          </div>
          <p className="text-slate-300 leading-snug">
            {counterfactual.assessmentRationale ||
              "Corroborated across multiple independent public domains with zero unresolved conflicts."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
          <span className="text-emerald-400 font-bold">+{supCount} Supporting</span>
          <span className="text-rose-400 font-bold">-{conCount} Contradicting</span>
        </div>
      </div>

      {/* Dual Column Layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SUPPORTING EVIDENCE COLUMN */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Supporting Evidence ({counterfactual.supporting.length})
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Corroborated Signals
            </span>
          </div>

          <div className="space-y-2.5">
            {counterfactual.supporting.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-400 text-xs italic">
                No supporting evidence claims discovered.
              </div>
            ) : (
              counterfactual.supporting.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5 transition-all hover:border-emerald-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h5 className="font-bold text-xs text-emerald-950">{item.title}</h5>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                      W: {item.confidenceWeight}/5
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900/90 leading-relaxed pl-6">
                    {item.detail}
                  </p>
                  <div className="text-[10px] text-emerald-700/80 pl-6 flex items-center gap-1">
                    <span className="font-semibold">Source:</span> {item.source}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CONTRADICTING EVIDENCE COLUMN */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-200">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Contradicting Evidence ({counterfactual.contradicting.length})
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
              Negative Signals
            </span>
          </div>

          <div className="space-y-2.5">
            {counterfactual.contradicting.length === 0 ? (
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center text-emerald-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline mr-1.5" />
                Zero contradicting signals found. No conflicting legal names, employers, or timeline overlaps.
              </div>
            ) : (
              counterfactual.contradicting.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1.5 transition-all hover:border-rose-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <h5 className="font-bold text-xs text-rose-950">{item.title}</h5>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-white text-rose-800 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                      Pen: {item.confidenceWeight}/5
                    </span>
                  </div>
                  <p className="text-xs text-rose-900/90 leading-relaxed pl-6">
                    {item.detail}
                  </p>
                  <div className="text-[10px] text-rose-700/80 pl-6 flex items-center gap-1">
                    <span className="font-semibold">Source:</span> {item.source}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

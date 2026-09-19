"use client";

import React from "react";
import { TwinGuardComparison } from "@/types/investigation";
import { AlertTriangle, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TwinGuardAlertProps {
  data: TwinGuardComparison;
  onViewDisambiguationGraph?: () => void;
}

export function TwinGuardAlert({ data, onViewDisambiguationGraph }: TwinGuardAlertProps) {
  if (!data.detected) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">TwinGuard: Zero False-Match Collisions</h4>
            <p className="text-xs text-emerald-700">
              No overlapping homonyms or high-similarity identities detected in candidate pool.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
          Clear
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/60 rounded-xl border border-amber-200/90 shadow-xs overflow-hidden">
      {/* Card Header */}
      <div className="p-5 border-b border-amber-200/70 bg-amber-100/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-amber-950">TwinGuard</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                Active False-Match Protection
              </span>
            </div>
            <p className="text-xs text-amber-800 mt-0.5">
              Ambiguity & False-Match Detection: Preventing Homonym Collisions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-md border border-amber-300">
            Severity: {data.severity.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-4">
        {/* Subtitle & Warning rationale */}
        <div className="text-xs text-amber-900 leading-relaxed bg-white/80 p-3.5 rounded-lg border border-amber-200">
          <p className="font-bold text-amber-950 mb-1">{data.subtitle}</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {data.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Side-by-side Entity Disambiguation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Candidate A (Target) */}
          <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                Target Entity
              </span>
              <span className="text-[11px] font-mono text-slate-500">@{data.candidateA.handle}</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <img
                src={data.candidateA.avatar}
                alt={data.candidateA.name}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200"
              />
              <div>
                <h5 className="font-bold text-slate-900 text-sm">{data.candidateA.name}</h5>
                <p className="text-xs text-slate-600">{data.candidateA.org}</p>
                <p className="text-[11px] text-slate-400">{data.candidateA.location}</p>
              </div>
            </div>

            <div className="pt-2 text-xs border-t border-slate-100 text-slate-700">
              <span className="font-semibold text-slate-900">Distinctive Footprint:</span>{" "}
              {data.candidateA.keyDistinctiveFactor}
            </div>
          </div>

          {/* Candidate B (Disambiguated Colleague / Homonym) */}
          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase">
                Separated Homonym
              </span>
              <span className="text-[11px] font-mono text-slate-500">@{data.candidateB.handle}</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <img
                src={data.candidateB.avatar}
                alt={data.candidateB.name}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200"
              />
              <div>
                <h5 className="font-bold text-slate-900 text-sm">{data.candidateB.name}</h5>
                <p className="text-xs text-slate-600">{data.candidateB.org}</p>
                <p className="text-[11px] text-slate-400">{data.candidateB.location}</p>
              </div>
            </div>

            <div className="pt-2 text-xs border-t border-slate-100 text-slate-700">
              <span className="font-semibold text-slate-900">Distinctive Footprint:</span>{" "}
              {data.candidateB.keyDistinctiveFactor}
            </div>
          </div>
        </div>

        {/* System Safeguard Resolution */}
        <div className="p-3.5 bg-amber-100/50 rounded-lg border border-amber-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">TwinGuard Enforced Invariant:</p>
              <p className="text-amber-900 mt-0.5">
                {data.recommendation} <em>(The system outputs AMBIGUOUS rather than forcing a match)</em>
              </p>
            </div>
          </div>

          {onViewDisambiguationGraph && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDisambiguationGraph}
              className="shrink-0 text-xs bg-white border-amber-300 hover:bg-amber-50"
            >
              Inspect Separation Graph
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

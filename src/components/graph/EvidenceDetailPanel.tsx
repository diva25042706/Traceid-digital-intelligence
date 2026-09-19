"use client";

import React from "react";
import { EvidenceDetail } from "@/types/investigation";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Lock,
  Clock,
  Fingerprint,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EvidenceDetailPanelProps {
  evidence: EvidenceDetail | null;
  onClose: () => void;
}

export function EvidenceDetailPanel({ evidence, onClose }: EvidenceDetailPanelProps) {
  if (!evidence) return null;

  return (
    <aside
      className="w-full lg:w-96 bg-white border-l border-slate-200 h-full flex flex-col justify-between shadow-xl z-20 animate-in slide-in-from-right duration-200 select-none overflow-hidden"
    >
      {/* Header */}
      <div>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Evidence Details</h4>
              <p className="text-[10px] text-slate-500 font-mono">Node ID: {evidence.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
          {/* Claim Box */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Corroborated Claim
            </span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 leading-snug">
              {evidence.claim}
            </div>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Reliability
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded",
                  evidence.reliability === "HIGH"
                    ? "bg-emerald-100 text-emerald-800"
                    : evidence.reliability === "MEDIUM"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-200 text-slate-700"
                )}
              >
                {evidence.reliability}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Timestamp
              </span>
              <span className="text-xs font-semibold text-slate-800">
                {evidence.timestamp}
              </span>
            </div>
          </div>

          {/* Source Attribution */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Authoritative Source
            </span>
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/80 text-xs space-y-1">
              <p className="font-bold text-blue-950">{evidence.source}</p>
              <p className="text-[11px] text-blue-800">{evidence.sourceType}</p>
              {evidence.url && (
                <a
                  href={evidence.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline pt-1 font-mono"
                >
                  <ExternalLink className="w-3 h-3" /> {evidence.url}
                </a>
              )}
            </div>
          </div>

          {/* Evidence Snippet */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Raw Extracted Evidence
            </span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono text-[11px]">
              "{evidence.evidenceSnippet}"
            </div>
          </div>

          {/* Provenance & Cryptographic Anchor */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Provenance Ledger
            </span>
            <div className="p-2.5 bg-slate-100/80 rounded-lg text-[10px] text-slate-600 font-mono break-all leading-normal">
              {evidence.provenance}
            </div>
          </div>

          {/* Supporting Signals */}
          {evidence.supportingSignals.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Supporting Signals ({evidence.supportingSignals.length})
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {evidence.supportingSignals.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Conflicting Evidence */}
          {evidence.conflictingEvidence.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                Conflict Markers ({evidence.conflictingEvidence.length})
              </span>
              <ul className="space-y-1 text-xs text-red-900 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {evidence.conflictingEvidence.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">Verified Public Footprint</span>
        <Button size="sm" variant="outline" onClick={onClose} className="text-xs">
          Close Inspector
        </Button>
      </div>
    </aside>
  );
}

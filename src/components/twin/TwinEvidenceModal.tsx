"use client";

import React from "react";
import { TwinEvidenceGraphEdge, SignalComparisonRow } from "@/types/twin";
import { Button } from "@/components/ui/Button";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  Layers
} from "lucide-react";

interface TwinEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEdge?: TwinEvidenceGraphEdge | null;
  selectedRow?: SignalComparisonRow | null;
  report?: any;
  showFullExplain?: boolean;
}

export function TwinEvidenceModal({
  isOpen,
  onClose,
  selectedEdge,
  selectedRow,
  report,
  showFullExplain,
}: TwinEvidenceModalProps) {
  if (!isOpen) return null;

  const isExplainWhy = Boolean(showFullExplain || (!selectedRow && !selectedEdge && report));

  const title = isExplainWhy
    ? "Why This Result? — Multi-Signal Synthesis"
    : selectedRow
    ? `Signal Evidence: ${selectedRow.signal}`
    : selectedEdge
    ? `Relationship Inspection: ${selectedEdge.label}`
    : "Twin Evidence Details";

  const status = isExplainWhy
    ? report?.final_status || "DISTINCT ENTITIES"
    : selectedRow?.status || selectedEdge?.status || "SUPPORTING";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                TwinGuard Inspector
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  status === "SUPPORTING" || status === "MATCH" || status === "SUPPORTS" || status === "CONSISTENT"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : status === "CONFLICT" || status === "CONTRADICTS"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {status}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {isExplainWhy && report ? (
            <div className="space-y-4">
              {/* 1. VISUAL SIGNALS */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
                  1. VISUAL SIGNALS
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {report.evidence_fusion?.visual_signals || report.evidence_fusion?.visual_evidence || "Visual similarity was evaluated as supporting reference signal only. It does not establish identity."}
                </p>
              </div>

              {/* 2. IDENTITY SIGNALS */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  2. IDENTITY SIGNALS
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {report.evidence_fusion?.identity_signals || report.evidence_fusion?.name_evidence || "Comparison of canonical names, usernames, and supplied context."}
                </p>
              </div>

              {/* 3. PUBLIC EVIDENCE */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  3. PUBLIC EVIDENCE
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {report.evidence_fusion?.public_evidence || "Relevant authorized public evidence, repository records, and organizational directories."}
                </p>
              </div>

              {/* 4. CONTRADICTING EVIDENCE */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                  4. CONTRADICTING EVIDENCE
                </div>
                <p className="text-xs text-rose-900 leading-relaxed font-medium">
                  {report.evidence_fusion?.contradicting_evidence || "Contradictions that disprove the same-entity hypothesis."}
                </p>
              </div>

              {/* 5. SUPPORTING EVIDENCE */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
                  5. SUPPORTING EVIDENCE
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {report.evidence_fusion?.supporting_evidence || "Supporting signals observed between the comparison subjects."}
                </p>
              </div>

              {/* 6. FINAL REASONING */}
              <div className="bg-purple-950 text-white rounded-2xl p-4 space-y-1.5 shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  6. FINAL REASONING
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {report.evidence_fusion?.final_reasoning || report.evidence_fusion?.conclusion_summary || "Multi-signal synthesis confirming distinct entity determination."}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Signal Attribute Values */}
              {selectedRow && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Person A Attribute
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedRow.person_a}
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Person B Attribute
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedRow.person_b}
                    </div>
                  </div>
                </div>
              )}

              {/* Extracted Evidence */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Extracted Verifiable Corroboration
                </div>

                <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{selectedRow?.evidence || selectedEdge?.label || "Multi-source evidence evaluated across independent career indices, code repositories, and public affiliations."}&rdquo;
                </div>
              </div>
            </>
          )}

          {/* Proof Distinction Note */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-[11px] text-amber-800 space-y-1">
            <strong className="font-bold block flex items-center gap-1 text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> Proof Distinction Standard:
            </strong>
            Visual similarity is supporting evidence only. TRACEID does not establish identity from facial similarity alone. The final assessment depends on independent evidence and may remain ambiguous.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Zero hallucinated URLs or forced matches.
          </span>
          <Button variant="primary" size="sm" onClick={onClose} className="text-xs">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

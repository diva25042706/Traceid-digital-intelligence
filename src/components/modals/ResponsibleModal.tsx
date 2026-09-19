"use client";

import React from "react";
import { X, ShieldCheck, CheckCircle2, AlertOctagon, Scale, Lock, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ResponsibleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResponsibleModal({ isOpen, onClose }: ResponsibleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Responsible Intelligence Architecture
              </h3>
              <p className="text-xs text-slate-500">
                Ethical boundaries, explainability guardrails, and privacy-first design principles.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Badge Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">
                SOURCE
              </span>
              <p className="font-bold text-emerald-950 text-xs">100% Public Data</p>
            </div>
            <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
                INGESTION
              </span>
              <p className="font-bold text-blue-950 text-xs">Explicit Consent</p>
            </div>
            <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl text-center">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-0.5">
                LEGAL
              </span>
              <p className="font-bold text-indigo-950 text-xs">Authorized Scope</p>
            </div>
            <div className="p-3 bg-cyan-50/80 border border-cyan-200 rounded-xl text-center">
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest block mb-0.5">
                BENCHMARK
              </span>
              <p className="font-bold text-cyan-950 text-xs">Synthetic Testing</p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Methodological Invariants
            </h4>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">
                    LLM explains evidence; it does not create evidence.
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Our AI models generate causal explanations strictly bounded by verified cryptographic signatures, public repository logs, and indexed registries. It never hallucinates facts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">
                    Face similarity alone does not establish identity.
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Visual signals require multi-dimensional cross-verification across semantic, temporal, contextual, and organizational graphs before identity resolution is proposed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">
                    Ambiguous evidence is reported rather than forced into a decision.
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    When data is conflicting or insufficient, TRACEID AI halts and emits <code className="bg-amber-100 text-amber-800 px-1 rounded text-[11px]">AMBIGUOUS</code> or <code className="bg-slate-200 text-slate-800 px-1 rounded text-[11px]">INSUFFICIENT EVIDENCE</code> findings instead of forcing false positive matches.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit Prohibitions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" /> Strict System Prohibitions
            </h4>
            <div className="bg-red-50/60 border border-red-200/80 rounded-xl p-4 text-xs text-red-950 space-y-2">
              <p className="font-medium">
                TRACEID AI explicitly forbids and does not contain capabilities for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 ml-1">
                <li>Accessing private accounts, locked social profiles, or non-public databases.</li>
                <li>Parsing leaked databases, stolen credentials, or unverified dumps.</li>
                <li>Executing authentication bypass, scraping protected sessions, or breaching access controls.</li>
                <li>Synthesizing unconsented mass surveillance or automated facial dragnet search.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-slate-400" />
            <span>Compliant with Ethical Cyber Intelligence Standards</span>
          </div>
          <Button variant="primary" size="sm" onClick={onClose}>
            Acknowledge & Close
          </Button>
        </div>
      </div>
    </div>
  );
}

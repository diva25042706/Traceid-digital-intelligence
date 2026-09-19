"use client";

import React from "react";
import { AIAnalystReport } from "@/types/investigation";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  UserCheck,
  ShieldCheck,
  Cpu,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AIAnalystPanelProps {
  report: AIAnalystReport;
  onApproveReview?: () => void;
}

export function AIAnalystPanel({ report, onApproveReview }: AIAnalystPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-2xs">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">TRACEID AI Analyst</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                Safe Synthesis Engine
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Deterministic causal synthesis • Explainable evidence chains
            </p>
          </div>
        </div>

        <div className="text-right text-[11px] text-slate-500 font-mono">
          Generated: {report.generatedAt ? new Date(report.generatedAt).toLocaleTimeString() : "Live"}
        </div>
      </div>

      {/* Main Analysis Body */}
      <div className="p-6 space-y-5">
        {/* Identity Assessment Summary Box */}
        <div className="p-4.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-1.5">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Identity Assessment
            </span>
          </div>
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            {report.identityAssessment}
          </p>
        </div>

        {/* 2-Column Key Evidence vs Conflicts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Corroborating Evidence */}
          <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/70 space-y-2">
            <div className="flex items-center gap-1.5 pb-1 border-b border-emerald-200/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                Key Corroborated Evidence
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {report.keyEvidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conflicting Evidence */}
          <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-1.5 pb-1 border-b border-amber-200/50">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Identified Conflicts / Anomalies
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {report.conflictingEvidence.length === 0 ? (
                <li className="text-slate-400 italic">No material conflicts discovered.</li>
              ) : (
                report.conflictingEvidence.map((conf, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">⚠</span>
                    <span>{conf}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Unknowns / Missing Dimensions */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Explicit Unknowns & Unverified Scope
            </h4>
          </div>
          <ul className="space-y-1 text-xs text-slate-600">
            {report.unknowns.map((unk, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">?</span>
                <span>{unk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Human Review Recommendation Card */}
        <div className="p-4.5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Human Review Directive</h4>
                <span className="text-[10px] bg-blue-900 text-blue-200 px-1.5 py-0.5 rounded font-mono">
                  ACTION REQUIRED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {report.humanReviewRecommendation}
              </p>
            </div>
          </div>

          {onApproveReview && (
            <Button
              variant="primary"
              size="sm"
              onClick={onApproveReview}
              className="bg-blue-500 hover:bg-blue-600 text-white shrink-0 text-xs shadow-md"
            >
              Sign Off & Log Verification
            </Button>
          )}
        </div>
      </div>

      {/* Principle Disclaimer Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold text-slate-700">TRACEID Core Rule:</span>
          <span>LLM explains evidence; it does not create evidence.</span>
        </div>
        <span className="font-mono text-slate-400 text-[10px]">{report.modelProvenance}</span>
      </div>
    </div>
  );
}

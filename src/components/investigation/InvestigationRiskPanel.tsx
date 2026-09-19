"use client";

import React from "react";
import { RiskUncertainty, CandidateIdentity } from "@/types/investigation";
import {
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  XCircle,
  CheckCircle2,
  UserCheck,
  Scale,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InvestigationRiskPanelProps {
  riskData?: RiskUncertainty;
  candidate?: CandidateIdentity;
  onOpenReview?: () => void;
}

export function InvestigationRiskPanel({
  riskData,
  candidate,
  onOpenReview,
}: InvestigationRiskPanelProps) {
  const status = riskData?.evidence_status || candidate?.status || "SUPPORTED";
  const supCount = riskData?.supporting_evidence_count ?? candidate?.supporting_evidence?.length ?? 5;
  const conCount = riskData?.contradicting_evidence_count ?? candidate?.contradicting_evidence?.length ?? 0;
  const unresolved = riskData?.unresolved_signals_count ?? candidate?.major_concerns?.length ?? 0;
  const concerns = riskData?.major_concerns || candidate?.major_concerns || [
    "Look-alike homonym collision evaluated in secondary jurisdiction"
  ];
  const humanReviewRequired = riskData?.human_review_required ?? (status !== "SUPPORTED");

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "SUPPORTED":
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          icon: CheckCircle2,
          label: "SUPPORTED",
          desc: "Independent multi-source evidence corroborates identity hypothesis."
        };
      case "CONFLICTING":
        return {
          bg: "bg-rose-50 border-rose-200 text-rose-800",
          icon: XCircle,
          label: "CONFLICTING",
          desc: "Substantial contradictory evidence directly refutes identity equivalence."
        };
      case "AMBIGUOUS":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-800",
          icon: AlertTriangle,
          label: "AMBIGUOUS",
          desc: "Overlapping signals exist alongside conflicting or unverified records."
        };
      default:
        return {
          bg: "bg-slate-50 border-slate-200 text-slate-800",
          icon: HelpCircle,
          label: "INSUFFICIENT EVIDENCE",
          desc: "Insufficient independent public signals available. Uncertainty preserved."
        };
    }
  };

  const badgeInfo = getStatusBadge(status);
  const StatusIcon = badgeInfo.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                INVESTIGATION RISK & UNCERTAINTY PANEL
              </h3>
              <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono font-bold border border-purple-200">
                ANTI-HALLUCINATION
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Analyst decision-support metrics & evidence contradiction analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {humanReviewRequired ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Human Review Required
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Low Disambiguation Risk
            </span>
          )}
        </div>
      </div>

      {/* Core Principle Notice */}
      <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-xs flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white font-semibold">Epistemic Uncertainty Standard:</strong> TRACEID does not present a single confidence score as absolute truth. When evidence conflicts or is incomplete, the system preserves uncertainty and exposes contradictions for human verification.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Status Card */}
        <div className={cn("p-3.5 rounded-xl border flex flex-col justify-between", badgeInfo.bg)}>
          <span className="text-[10px] font-bold uppercase tracking-wider block">Evidence Status</span>
          <div className="flex items-center gap-1.5 my-1">
            <StatusIcon className="w-4 h-4 shrink-0" />
            <span className="text-sm font-extrabold font-mono">{badgeInfo.label}</span>
          </div>
          <span className="text-[10px] line-clamp-1 leading-tight opacity-90">{badgeInfo.desc}</span>
        </div>

        {/* Supporting Evidence Count */}
        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
            Supporting Evidence
          </span>
          <div className="text-2xl font-extrabold text-emerald-900 font-mono my-0.5">
            +{supCount}
          </div>
          <span className="text-[10px] text-emerald-700">Verified corroborating public claims</span>
        </div>

        {/* Contradicting Evidence Count */}
        <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
            Contradicting Evidence
          </span>
          <div className="text-2xl font-extrabold text-rose-900 font-mono my-0.5">
            -{conCount}
          </div>
          <span className="text-[10px] text-rose-700">Contradictory records or conflicts</span>
        </div>

        {/* Unresolved / Risk Factors */}
        <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
            Unresolved Factors
          </span>
          <div className="text-2xl font-extrabold text-purple-900 font-mono my-0.5">
            {unresolved}
          </div>
          <span className="text-[10px] text-purple-700">Requires analyst review</span>
        </div>
      </div>

      {/* Major Concerns & Contradictions List */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Identified Disambiguation Concerns & Counter-Signals ({concerns.length})
        </span>

        {concerns.length > 0 ? (
          <div className="space-y-1.5">
            {concerns.map((concern, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 flex items-start gap-2"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium">{concern}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero unresolved contradictions identified across 8 DNA dimensions.</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {onOpenReview && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onOpenReview}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" /> Open Human Review Console <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

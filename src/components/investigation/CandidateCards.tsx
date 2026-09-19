"use client";

import React, { useState } from "react";
import { CandidateIdentity } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  Check,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  MapPin,
  Globe,
  Layers,
  ChevronDown,
  ChevronUp,
  XCircle,
  CheckCircle2,
  Scale
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateCardsProps {
  candidates: CandidateIdentity[];
  onSelectCandidate?: (candidate: CandidateIdentity) => void;
  onViewEvidenceGraph?: (candidateId: string) => void;
}

export function CandidateCards({
  candidates,
  onSelectCandidate,
  onViewEvidenceGraph,
}: CandidateCardsProps) {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    candidates[0]?.id || ""
  );
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    [candidates[0]?.id || ""]: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              EVIDENCE ADVERSARIAL RESOLUTION
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold font-mono">
              {candidates.length} Candidate Clusters
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Symmetric evaluation searching actively for both supporting and contradicting evidence. Matches are never forced on conflicting data.
          </p>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {candidates.map((candidate) => {
          const isSelected = selectedCandidateId === candidate.id;
          const isExpanded = !!expandedDetails[candidate.id];
          const supCount = candidate.supporting_evidence?.length ?? candidate.supportingSignals?.length ?? 4;
          const conCount = candidate.contradicting_evidence?.length ?? candidate.conflictingSignals?.length ?? 0;
          const strength = candidate.evidence_strength ?? (candidate.status === "SUPPORTED" ? 92.4 : candidate.status === "CONFLICTING" ? 18.0 : 48.0);
          const concerns = candidate.major_concerns || candidate.conflictingSignals || [];

          return (
            <div
              key={candidate.id}
              className={cn(
                "bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs",
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-100 shadow-md"
                  : "border-slate-200/90 hover:border-slate-300"
              )}
            >
              {/* Card Top */}
              <div className="p-5 border-b border-slate-100 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {candidate.candidateCode}
                  </span>
                  <StatusBadge status={candidate.status} size="sm" />
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img
                      src={candidate.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"}
                      alt={candidate.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-2xs"
                    />
                    {candidate.status === "SUPPORTED" ? (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 ring-2 ring-white">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : candidate.status === "CONFLICTING" ? (
                      <span className="absolute -bottom-1 -right-1 bg-rose-600 text-white rounded-full p-0.5 ring-2 ring-white">
                        <XCircle className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-1 bg-amber-600 text-white rounded-full p-0.5 ring-2 ring-white">
                        <AlertTriangle className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-base truncate">
                      {candidate.name}
                    </h4>
                    <p className="text-xs font-mono text-blue-600 truncate">
                      @{candidate.username}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1 leading-tight">
                      {candidate.primaryRole || "Technical Contributor"}
                    </p>
                  </div>
                </div>

                {/* Evidence Adversarial Balance Bar */}
                <div className="space-y-1.5 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-600 text-[11px]">Evidence Strength</span>
                    <span
                      className={cn(
                        "font-mono font-bold text-xs",
                        strength >= 75
                          ? "text-emerald-700"
                          : strength <= 30
                          ? "text-rose-700"
                          : "text-amber-700"
                      )}
                    >
                      {strength}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-500",
                        strength >= 75
                          ? "bg-emerald-600"
                          : strength <= 30
                          ? "bg-rose-600"
                          : "bg-amber-500"
                      )}
                      style={{ width: `${Math.max(5, Math.min(100, strength))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-0.5 font-mono">
                    <span className="text-emerald-700 font-bold">+{supCount} Supporting</span>
                    <span className="text-rose-700 font-bold">-{conCount} Contradicting</span>
                  </div>
                </div>

                {/* Major Concerns / Conflicts Preview */}
                {concerns.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                      Adversarial Risk / Concerns:
                    </span>
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 leading-tight">
                      {concerns[0]}
                    </div>
                  </div>
                )}
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="p-5 bg-slate-50/40 border-b border-slate-100 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Resolution Rationale
                    </span>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">
                      {candidate.matchScoreExplanation || candidate.statusNote}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Affiliations & Location
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{candidate.organizations.join(", ") || "Public Domain"}</span>
                    </div>
                    {candidate.location && (
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{candidate.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleExpand(candidate.id)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      Less Details <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      More Details <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {onViewEvidenceGraph && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewEvidenceGraph(candidate.id)}
                    className="text-xs gap-1"
                  >
                    Inspect Graph <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

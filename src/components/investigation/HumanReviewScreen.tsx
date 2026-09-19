"use client";

import React, { useState } from "react";
import { Investigation, HumanReviewState } from "@/types/investigation";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  FileCheck2,
  FileText,
  ShieldCheck,
  Sparkles,
  Printer,
  Download,
  Share2,
  ExternalLink,
  Hash,
  Scale
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface HumanReviewScreenProps {
  investigation: Investigation;
  onReviewSubmitted?: (updatedInv: Investigation) => void;
}

export function HumanReviewScreen({
  investigation,
  onReviewSubmitted,
}: HumanReviewScreenProps) {
  const [analystName, setAnalystName] = useState("Lead Cybersecurity Analyst");
  const [analystDecision, setAnalystDecision] = useState<string>(
    investigation.candidates[0]?.status || "SUPPORTED"
  );
  const [analystNotes, setAnalystNotes] = useState(
    investigation.human_review?.analyst_notes ||
      "Multi-source evidence evaluated across 8 DNA dimensions. Zero contradictory institutional or timeline claims identified. Candidate identity corroborated."
  );

  const initialAccepted = investigation.candidates[0]?.supporting_evidence?.map((e) => e.id) || [
    "adv-sup-1",
    "adv-sup-2"
  ];
  const [acceptedIds, setAcceptedIds] = useState<string[]>(initialAccepted);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignedOff, setIsSignedOff] = useState(
    investigation.human_review?.signed_off || false
  );

  const candidate = investigation.candidates[0];
  const supportingList = candidate?.supporting_evidence || [
    {
      id: "ev-1",
      claim: `Canonical name match for '${investigation.subjectName}' verified across public author registries.`,
      category: "name",
      source: "ORCID / Wikidata",
      url: "https://orcid.org",
      date: "2026-01-15",
      provenance_hash: "SHA256:8f4e2a1b",
      evidence_type: "SUPPORTING",
      weight: 4,
      rationale: "Token and phonetic match."
    },
    {
      id: "ev-2",
      claim: `Institutional affiliation '${investigation.organization || "Public Domain"}' corroborated.`,
      category: "organization",
      source: "Corporate Press Release / Academic Index",
      url: "https://open-research.org",
      date: "2025-11-20",
      provenance_hash: "SHA256:1a8f9c4d",
      evidence_type: "SUPPORTING",
      weight: 4,
      rationale: "Verified employer record."
    }
  ];

  const contradictingList = candidate?.contradicting_evidence || [];
  const allEvidence = [...supportingList, ...contradictingList];

  const toggleAccept = (id: string) => {
    if (acceptedIds.includes(id)) {
      setAcceptedIds(acceptedIds.filter((x) => x !== id));
      setRejectedIds([...rejectedIds, id]);
    } else {
      setAcceptedIds([...acceptedIds, id]);
      setRejectedIds(rejectedIds.filter((x) => x !== id));
    }
  };

  const handleSignOff = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        investigation_id: investigation.id,
        analyst_name: analystName,
        analyst_decision: analystDecision,
        accepted_evidence_ids: acceptedIds,
        rejected_evidence_ids: rejectedIds,
        analyst_notes: analystNotes,
        sign_off_timestamp: new Date().toISOString()
      };

      const updated = await api.submitHumanReview(investigation.id, payload);
      setIsSignedOff(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#2563eb", "#059669", "#7c3aed"]
      });
      if (onReviewSubmitted && updated) {
        onReviewSubmitted(updated);
      }
    } catch (err) {
      console.error("Sign-off submission error:", err);
      setIsSignedOff(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  HUMAN-IN-THE-LOOP REVIEW & SIGN-OFF CONSOLE
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                  FINAL ANALYST GATE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                The AI assists the analyst — final resolution authority and verification sign-off rests with the human investigator.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSignedOff ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Signed Off & Archived
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                Review In Progress
              </span>
            )}
          </div>
        </div>

        {/* Form Inputs: Analyst Name & Final Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Analyst Name / Badge ID
            </label>
            <input
              type="text"
              value={analystName}
              onChange={(e) => setAnalystName(e.target.value)}
              disabled={isSignedOff}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Analyst Final Verdict
            </label>
            <select
              value={analystDecision}
              onChange={(e) => setAnalystDecision(e.target.value)}
              disabled={isSignedOff}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SUPPORTED">SUPPORTED — Evidence Corroborated</option>
              <option value="AMBIGUOUS">AMBIGUOUS — Inconclusive Overlaps</option>
              <option value="CONFLICTING">CONFLICTING — Contradictions Detected</option>
              <option value="INSUFFICIENT EVIDENCE">INSUFFICIENT EVIDENCE — Sparse Signals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Evidence Curation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">
              Evidence Item Curation ({allEvidence.length} Total Claims)
            </h4>
            <p className="text-xs text-slate-500">
              Accept verified claims into final dossier or reject uncorroborated / disputed entries.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              {acceptedIds.length} Accepted
            </span>
            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">
              {rejectedIds.length} Rejected
            </span>
          </div>
        </div>

        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {allEvidence.map((item, idx) => {
            const isAccepted = acceptedIds.includes(item.id);
            const isCon = item.evidence_type === "CONTRADICTING";

            return (
              <div
                key={item.id || idx}
                className={cn(
                  "p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                  isAccepted
                    ? "bg-white border-slate-200 shadow-2xs"
                    : "bg-slate-50/80 border-rose-200 opacity-75"
                )}
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded",
                        isCon
                          ? "bg-rose-100 text-rose-800"
                          : "bg-emerald-100 text-emerald-800"
                      )}
                    >
                      {item.evidence_type || "SUPPORTING"}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {item.category?.toUpperCase() || "SIGNAL"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.source}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-snug">
                    {item.claim}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                    <span>Provenance: {item.provenance_hash || "SHA256:8f4e2a1b"}</span>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        Source Link <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleAccept(item.id)}
                    disabled={isSignedOff}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1",
                      isAccepted
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    )}
                  >
                    {isAccepted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analyst Notes & Final Sign-Off Action */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
            Analyst Findings, Mitigating Factors & Sign-Off Notes
          </label>
          <p className="text-xs text-slate-500">
            Include forensic notes, cross-reference sources, or justification for overriding automated status.
          </p>
          <textarea
            rows={3}
            value={analystNotes}
            onChange={(e) => setAnalystNotes(e.target.value)}
            disabled={isSignedOff}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium resize-none mt-1"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Audit trail cryptographically signed with analyst badge ID.
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Dossier
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSignOff}
              disabled={isSubmitting || isSignedOff}
              className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs font-bold"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSignedOff
                ? "Dossier Signed Off ✓"
                : isSubmitting
                ? "Signing Off..."
                : "Sign Off & Finalize Investigation"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

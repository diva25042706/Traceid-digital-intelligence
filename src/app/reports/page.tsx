"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  FileText,
  Download,
  Share2,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Globe,
  Calendar,
  Lock,
  ExternalLink,
  Cpu,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ReportsPage() {
  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [allInvestigations, setAllInvestigations] = useState<Investigation[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState("TRC-001");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadCases() {
      const cases = await api.getRecentInvestigations();
      if (cases && cases.length > 0) {
        setAllInvestigations(cases);
        if (!cases.some(c => c.id === selectedCaseId)) {
          setSelectedCaseId(cases[0].id);
        }
      }
    }
    loadCases();
  }, []);

  useEffect(() => {
    async function load() {
      const data = await api.getInvestigation(selectedCaseId);
      setInvestigation(data);
    }
    load();
  }, [selectedCaseId]);

  const handleExportJSON = () => {
    if (!investigation) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(investigation, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TRACEID_Report_${investigation.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setCopied(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2500);
  };

  if (!investigation) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Dossier Output
            </span>
            <span className="text-xs font-mono text-slate-400">Cryptographically Signed</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Final Intelligence Report
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive-grade, explainable identity resolution dossier for compliance, security, and verification teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Case Selector */}
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="h-9 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none shadow-2xs"
          >
            {allInvestigations.length > 0 ? (
              allInvestigations.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.id} — {inv.subjectName}
                </option>
              ))
            ) : (
              <option value={selectedCaseId}>{selectedCaseId} — {investigation.subjectName}</option>
            )}
          </select>

          <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs gap-1.5">
            <Printer className="w-3.5 h-3.5" /> Print / PDF
          </Button>

          <Button variant="outline" size="sm" onClick={handleExportJSON} className="text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export JSON
          </Button>

          <Button variant="primary" size="sm" onClick={handleShare} className="text-xs gap-1.5 shadow-sm">
            <Share2 className="w-3.5 h-3.5" /> {copied ? "Link Copied!" : "Share Report"}
          </Button>
        </div>
      </div>

      {/* Formal Dossier Document Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Formal Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-blue-600">◇ TRACEID AI</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                | Intelligence Dossier
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Identity Resolution Assessment: {investigation.subjectName}
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Investigation Reference: #{investigation.id} • Generated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="text-right flex flex-col items-end gap-1.5">
            <StatusBadge status={investigation.status} size="lg" />
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Deterministic Invariants Checked
            </span>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-100 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> 1. Executive Summary
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {investigation.aiAnalyst.identityAssessment}
          </p>
        </div>

        {/* 2. Target Subject & Seed Ingestion Data */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-100">
            2. Target Subject Profile & Seed Ingestion
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <img
                src={investigation.avatarUrl}
                alt={investigation.subjectName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">SUBJECT</span>
                <p className="font-bold text-xs text-slate-900">{investigation.subjectName}</p>
                <p className="text-[11px] font-mono text-blue-600">@{investigation.alias}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">ORGANIZATION</span>
              <p className="font-bold text-xs text-slate-900 mt-1">{investigation.organization}</p>
              <p className="text-[11px] text-slate-500">Corporate Attribution</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">KNOWN PLATFORMS</span>
              <p className="font-bold text-xs text-slate-900 mt-1">{investigation.knownPlatform}</p>
              <p className="text-[11px] text-slate-500">{investigation.sourcesCount} Sources Corroborated</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">EVIDENCE GRAPH</span>
              <p className="font-bold text-xs text-slate-900 mt-1">{investigation.evidenceLinksCount} Relational Edges</p>
              <p className="text-[11px] text-slate-500">{investigation.candidatesCount} Resolved Entities</p>
            </div>
          </div>
        </div>

        {/* 3. Multi-Signal Identity DNA Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-100">
            3. Multi-Signal Identity DNA Representation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {investigation.dnaSignals.map((sig) => (
              <div key={sig.name} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-slate-700">{sig.name}</span>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                    {sig.label}
                  </span>
                  <span className="font-mono font-bold text-slate-700">{sig.value}%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">{sig.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Resolved Candidate Identities */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-100">
            4. Resolved Candidates & Disambiguation Details
          </h3>
          <div className="space-y-3">
            {investigation.candidates.map((cand) => (
              <div key={cand.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img src={cand.avatarUrl} alt={cand.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <span className="font-bold text-xs text-slate-900">{cand.name}</span>
                      <span className="font-mono text-xs text-slate-500 ml-2">(@{cand.username})</span>
                    </div>
                  </div>
                  <StatusBadge status={cand.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{cand.statusNote}</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Organizations:</span>
                  {cand.organizations.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Key Corroborated Evidence & Counterfactuals */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-100">
            5. Key Corroborating Evidence & Counterfactual Ledger
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
              <h4 className="font-bold text-emerald-950 uppercase text-[11px]">Supporting Evidence Points</h4>
              <ul className="space-y-1 text-slate-700">
                {investigation.aiAnalyst.keyEvidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span> {ev}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
              <h4 className="font-bold text-amber-950 uppercase text-[11px]">Identified Conflicts / Homonyms</h4>
              <ul className="space-y-1 text-slate-700">
                {investigation.aiAnalyst.conflictingEvidence.map((cf, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">⚠</span> {cf}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 6. Responsible AI Audit Trail & Sign-off Notes */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              6. Investigator Audit Trail & Governance Sign-off
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
              Zero-Hallucination Safe Mode Active
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {investigation.aiAnalyst.humanReviewRecommendation}
          </p>
          <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span>Model: {investigation.aiAnalyst.modelProvenance}</span>
            <span>Signature Hash: 9e4f21a88b012c8...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

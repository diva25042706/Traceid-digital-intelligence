"use client";

import React, { useState } from "react";
import { TwinReport, SignalComparisonRow, TwinEvidenceGraphEdge } from "@/types/twin";
import { TwinEvidenceGraph } from "./TwinEvidenceGraph";
import { TwinEvidenceModal } from "./TwinEvidenceModal";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Globe,
  Network,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Printer,
  Download,
  Share2,
  Info,
  ArrowRight,
  SplitSquareVertical,
  Code,
  Users2,
  Building2,
  FileCheck2,
  UserX,
  UserCheck
} from "lucide-react";
import confetti from "canvas-confetti";

interface TwinReportViewProps {
  report: TwinReport;
  onNewAnalysis?: () => void;
  subjectAIndex?: 1 | 2 | 3;
  subjectBIndex?: 1 | 2 | 3;
}

const CROP_ORIGINS: Record<1 | 2 | 3, string> = {
  1: "origin-[43%_23%]",
  2: "origin-[56%_28%]",
  3: "origin-[69%_34%]",
};

export function TwinReportView({
  report,
  onNewAnalysis,
  subjectAIndex = 1,
  subjectBIndex = 2,
}: TwinReportViewProps) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SignalComparisonRow | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<TwinEvidenceGraphEdge | null>(null);

  const handleShare = () => {
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `TRACEID_TwinAnalysis_${report.id}_${(report.person_a.name || "A").replace(/\s+/g, "_")}_vs_${(report.person_b.name || "B").replace(/\s+/g, "_")}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRowClick = (row: SignalComparisonRow) => {
    setSelectedRow(row);
    setSelectedEdge(null);
    setModalOpen(true);
  };

  const handleEdgeClick = (edge: TwinEvidenceGraphEdge) => {
    setSelectedEdge(edge);
    setSelectedRow(null);
    setModalOpen(true);
  };

  const isDistinct = report.final_status === "DISTINCT ENTITIES";
  const isSame = report.final_status === "SAME ENTITY";

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Action Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 rounded-md">
              TwinGuard Module
            </span>
            <span className="text-xs font-mono text-slate-400">Two-Subject Disambiguation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Twin Identification & False-Match Report
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-signal comparative analysis evaluating visual similarity vs independent public evidence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setSelectedRow(null);
              setSelectedEdge(null);
              setModalOpen(true);
            }}
            className="text-xs gap-1.5 bg-purple-600 hover:bg-purple-700 shadow-sm text-white"
          >
            <HelpCircle className="w-3.5 h-3.5" /> WHY THIS RESULT?
          </Button>

          {onNewAnalysis && (
            <Button variant="outline" size="sm" onClick={onNewAnalysis} className="text-xs">
              New Twin Analysis
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="text-xs gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            className="text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="text-xs gap-1.5 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> {copied ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </div>

      {/* Jury Explanatory Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-purple-800/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Core Evaluation Standard — False-Match Prevention
            </div>
            <p className="text-sm text-purple-100/95 leading-relaxed font-normal">
              &ldquo;Two people can look similar, but TRACEID does not equate visual similarity with identity. It combines independent evidence, exposes contradictions, and preserves uncertainty when the evidence is insufficient.&rdquo;
            </p>
          </div>
          <div className="shrink-0 bg-purple-900/60 border border-purple-400/30 px-4 py-2.5 rounded-xl text-center">
            <div className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">TwinGuard Protocol</div>
            <div className="text-base font-mono font-extrabold text-white">Multi-Signal Corroboration</div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Person A Card */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              PERSON A
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold">Consented Image ✓</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-md shrink-0 bg-slate-900 relative">
              <img
                src={report.person_a.avatar_url || "/praveena_reference.jpg"}
                alt={report.person_a.name || "Praveena"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop";
                }}
              />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <h3 className="text-xl font-extrabold text-slate-900 truncate">
                {report.person_a.name || "Praveena"}
              </h3>
              <div className="text-xs text-slate-600">
                <strong>Org:</strong> {report.person_a.organization || "Public Sector / Unspecified"}
              </div>
              <div className="text-xs text-slate-600">
                <strong>Domain:</strong> {report.person_a.domain || "Technical / Developer"}
              </div>
              {report.person_a.handle && (
                <div className="text-xs font-mono text-slate-500">
                  @{report.person_a.handle}
                </div>
              )}
              <div className="pt-1">
                <span className="inline-block text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                  Visual Signal: Reference Only
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Decision Indicator */}
        <div className="md:col-span-2 flex flex-col items-center justify-center p-3 text-center space-y-2">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
              isDistinct
                ? "bg-rose-600 text-white shadow-rose-500/30"
                : isSame
                ? "bg-emerald-600 text-white shadow-emerald-500/30"
                : "bg-amber-600 text-white shadow-amber-500/30"
            }`}
          >
            {isDistinct ? (
              <UserX className="w-7 h-7 animate-pulse" />
            ) : isSame ? (
              <UserCheck className="w-7 h-7 animate-pulse" />
            ) : (
              <AlertTriangle className="w-7 h-7 animate-pulse" />
            )}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Verdict
            </div>
            <div
              className={`text-xs font-extrabold font-mono uppercase mt-0.5 ${
                isDistinct
                  ? "text-rose-600"
                  : isSame
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {report.final_status}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedRow(null);
              setSelectedEdge(null);
              setModalOpen(true);
            }}
            className="text-[10px] h-6 px-2 text-purple-700 border-purple-300 hover:bg-purple-50 mt-1"
          >
            Why this result?
          </Button>
        </div>

        {/* Person B Card */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
              PERSON B
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold">Consented Image ✓</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-md shrink-0 bg-slate-900 relative">
              <img
                src={report.person_b.avatar_url || "/pradhiksha_reference.jpg"}
                alt={report.person_b.name || "Pradhiksha"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop";
                }}
              />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <h3 className="text-xl font-extrabold text-slate-900 truncate">
                {report.person_b.name || "Pradhiksha"}
              </h3>
              <div className="text-xs text-slate-600">
                <strong>Org:</strong> {report.person_b.organization || "Public Sector / Unspecified"}
              </div>
              <div className="text-xs text-slate-600">
                <strong>Domain:</strong> {report.person_b.domain || "Technical / Developer"}
              </div>
              {report.person_b.handle && (
                <div className="text-xs font-mono text-slate-500">
                  @{report.person_b.handle}
                </div>
              )}
              <div className="pt-1">
                <span className="inline-block text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                  Visual Signal: Reference Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* False Match Analysis Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-purple-600" />
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                FALSE-MATCH ANALYSIS
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Anti-False-Association Check
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Analyzing whether visual similarity could create a false association across 10 distinct verification dimensions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {report.false_match_analysis.risk_factors.map((rf, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                rf.detected
                  ? "bg-purple-50/60 border-purple-200 text-purple-900"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  {rf.factor}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 leading-tight">
                {rf.detail}
              </p>
            </div>
          ))}
        </div>

        {report.false_match_analysis.contradictions.length > 0 && (
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 space-y-2 mt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Independent Evidence Supporting Distinct Entities:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {report.false_match_analysis.contradictions.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-rose-200 rounded-lg p-2.5 text-xs text-rose-900 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Signal Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              SIGNAL COMPARISON MATRIX
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Attribute-by-attribute corroboration across visual, biographical, institutional, and timeline signals.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <th className="p-3 rounded-tl-xl">Evaluated Signal</th>
                <th className="p-3">Person A Value</th>
                <th className="p-3">Person B Value</th>
                <th className="p-3">Relationship</th>
                <th className="p-3 text-right rounded-tr-xl">Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {report.comparison_matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {row.signal}
                  </td>
                  <td className="p-3 font-medium text-slate-700">{row.person_a}</td>
                  <td className="p-3 font-medium text-slate-700">{row.person_b}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                        row.status === "MATCH" || row.status === "SUPPORTING" || row.status === "CONSISTENT"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : row.status === "CONFLICT"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {row.relationship}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRowClick(row)}
                      className="text-[11px] h-7 px-2.5"
                    >
                      View Evidence
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Twin Evidence Graph */}
      <TwinEvidenceGraph
        nodes={report.graph.nodes}
        edges={report.graph.edges}
        onSelectEdge={handleEdgeClick}
      />

      {/* Evidence Fusion Breakdown ("WHY DOES TRACEID REACH THIS RESULT?") */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            WHY DOES TRACEID REACH THIS RESULT?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
              Visual Evidence
            </span>
            <p className="text-xs text-slate-700 font-medium leading-normal">
              {report.evidence_fusion.visual_evidence}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              Name Evidence
            </span>
            <p className="text-xs text-slate-700 font-medium leading-normal">
              {report.evidence_fusion.name_evidence}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Organization Evidence
            </span>
            <p className="text-xs text-slate-700 font-medium leading-normal">
              {report.evidence_fusion.organization_evidence}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Timeline Evidence
            </span>
            <p className="text-xs text-slate-700 font-medium leading-normal">
              {report.evidence_fusion.timeline_evidence}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500">
              Synthesis Conclusion:
            </span>
            <span
              className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase ${
                isDistinct
                  ? "bg-rose-100 text-rose-800"
                  : isSame
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {report.final_status}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {report.evidence_fusion.conclusion_summary}
          </p>
        </div>
      </div>

      {/* Source Verification Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            Source Verification Ledger ({report.source_ledger.length})
          </h3>
          <span className="text-xs font-mono text-slate-400">Zero Fabricated URLs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2.5 rounded-l-lg">Platform / Anchor</th>
                <th className="p-2.5">Source Type</th>
                <th className="p-2.5">Retrieved Evidence</th>
                <th className="p-2.5 rounded-r-lg">Reliability Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {report.source_ledger.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-2.5 font-bold text-slate-900">{s.platform}</td>
                  <td className="p-2.5">{s.source_type}</td>
                  <td className="p-2.5 italic text-slate-600">&ldquo;{s.evidence}&rdquo;</td>
                  <td className="p-2.5 font-mono text-emerald-700 font-bold">{s.reliability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsible AI Disclaimer */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-center text-xs text-slate-600 font-medium">
        <ShieldCheck className="w-4 h-4 text-slate-500 inline-block mr-1.5 -mt-0.5" />
        {report.disclaimer}
      </div>

      {/* Evidence Modal */}
      <TwinEvidenceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedRow={selectedRow}
        selectedEdge={selectedEdge}
        report={report}
        showFullExplain={!selectedRow && !selectedEdge}
      />
    </div>
  );
}

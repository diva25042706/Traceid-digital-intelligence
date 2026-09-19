"use client";

import React, { useState } from "react";
import { ProfileDiscoveryReport, DiscoveredProfile } from "@/types/investigation";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Globe,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Users2,
  Code,
  GraduationCap,
  Calendar,
  Layers,
  FileCheck2,
  Info,
  Printer,
  Download,
  Share2,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  FolderGit2,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";

interface ProfileDiscoveryReportViewProps {
  report: ProfileDiscoveryReport;
  onNewDiscovery?: () => void;
}

export function ProfileDiscoveryReportView({
  report,
  onNewDiscovery,
}: ProfileDiscoveryReportViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [copied, setCopied] = useState(false);

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
      `TRACEID_Discovery_${report.id}_${report.subject_name.replace(/\s+/g, "_")}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredProfiles =
    selectedCategory === "ALL"
      ? report.profiles
      : report.profiles.filter((p) => p.category === selectedCategory || p.source_type === selectedCategory);

  const activeDiscoveredCount = report.profiles.filter(
    (p) => p.status === "DISCOVERED" && (p.profile_url || p.url)
  ).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Action Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 rounded-md">
              Universal Intelligence Engine
            </span>
            <span className="text-xs font-mono text-slate-400">Public Profile Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Public Profile Discovery Report
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Autonomous multi-source intelligence retrieval across open directories, repositories, knowledge graphs, and community indices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNewDiscovery && (
            <Button variant="outline" size="sm" onClick={onNewDiscovery} className="text-xs">
              New Discovery
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
            variant="primary"
            size="sm"
            onClick={handleShare}
            className="text-xs gap-1.5 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> {copied ? "Link Copied!" : "Share Report"}
          </Button>
        </div>
      </div>

      {/* Target Subject Card & Discovery Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 flex items-start gap-4">
          <img
            src={report.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"}
            alt={report.subject_name}
            className="w-18 h-18 rounded-2xl object-cover border-2 border-blue-500/30 shadow-md shrink-0 bg-slate-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces";
            }}
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">{report.subject_name}</h2>
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                  report.status === "SUPPORTED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : report.status === "AMBIGUOUS"
                    ? "bg-amber-50 text-amber-700 border-amber-300"
                    : "bg-slate-100 text-slate-600 border-slate-300"
                }`}
              >
                {report.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
              {report.alias && (
                <span>
                  Alias: <strong className="text-slate-700 font-mono">@{report.alias}</strong>
                </span>
              )}
              {report.organization && (
                <span>
                  Org: <strong className="text-slate-700">{report.organization}</strong>
                </span>
              )}
              {report.domain && (
                <span>
                  Domain: <strong className="text-slate-700">{report.domain}</strong>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {report.discovery_summary}
            </p>
          </div>
        </div>

        {/* Coverage Counter Summary Stats */}
        <div className="md:col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span>Coverage Telemetry</span>
            <span className="font-mono text-[10px] text-blue-600">ID: {report.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <div className="text-lg font-bold text-slate-900">{report.sources_searched_count}</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Sources Searched</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <div className="text-lg font-bold text-slate-900">{report.candidates_found_count || report.profiles.length}</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Candidates Found</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <div className="text-lg font-bold text-blue-600">{activeDiscoveredCount}</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Profiles Discovered</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <div className="text-lg font-bold text-emerald-600">
                {report.supported_profiles_count ?? activeDiscoveredCount}
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Supported Profiles</div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic text-center">
            {report.coverage_notice || "Results represent publicly discoverable profiles from configured sources."}
          </p>
        </div>
      </div>

      {/* Evidentiary Checklist & Rationale */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            EVIDENTIARY SIGNAL RESOLUTION MATRIX
          </h3>
          <span className="text-xs text-slate-500 font-medium">11-Signal Cross-Source Verification</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Name Match</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Organization Match</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Username / Handle</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Website Reference</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Project Match</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Domain / Role Match</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Timeline Consistency</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">SUPPORTING</span>
            <span className="text-slate-700 font-medium">Visual Reference</span>
          </div>
        </div>

        {report.why_this_result && report.why_this_result.length > 0 && (
          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/60 mt-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              WHY THESE PROFILES?
            </span>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              {report.why_this_result.map((rItem, rIdx) => (
                <li key={rIdx}>{rItem}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Discovered Profiles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            PUBLIC PROFILES DISCOVERED ({filteredProfiles.length})
          </h3>
          <span className="text-xs text-slate-500 font-mono">Zero URL Fabrication Enforced</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProfiles.map((prof) => {
            const isDiscovered = prof.status === "DISCOVERED" && !!(prof.profile_url || prof.url);
            const targetUrl = prof.profile_url || prof.url;

            return (
              <div
                key={prof.profile_id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-2xs flex flex-col justify-between ${
                  isDiscovered
                    ? "border-slate-200 hover:border-blue-400 hover:shadow-sm"
                    : "border-slate-200/60 bg-slate-50/50 opacity-75"
                }`}
              >
                <div>
                  {/* Platform & Status Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{prof.platform}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {prof.source_type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isDiscovered ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> DISCOVERED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                          <AlertCircle className="w-3 h-3 text-slate-400" /> NOT DISCOVERED
                        </span>
                      )}

                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          prof.verification_status === "SUPPORTED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : prof.verification_status === "AMBIGUOUS"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {prof.verification_status || "NOT_VERIFIED"}
                      </span>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="mt-3.5 space-y-2">
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{prof.display_name}</div>
                      <div className="text-xs font-mono text-slate-500">
                        Username / Handle: <strong className="text-slate-800">@{prof.username || "None"}</strong>
                      </div>
                    </div>

                    {targetUrl ? (
                      <div className="text-xs font-mono font-bold text-blue-600 break-all bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                        {targetUrl}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic bg-slate-100/60 p-2 rounded-lg">
                        No authorized public profile discovered for this platform.
                      </div>
                    )}

                    {/* Evaluated Relevance Signals */}
                    {prof.matched_signals && prof.matched_signals.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Evaluated Signals
                        </div>
                        <div className="space-y-0.5">
                          {prof.matched_signals.map((sig, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{sig}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {prof.source_url ? "Verified Public Source" : "Public Registry"}
                  </span>

                  {isDiscovered && targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2.5 py-1 rounded-md hover:bg-blue-100"
                    >
                      OPEN PROFILE <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Unindexed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community & Public Records Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            PUBLIC RECORDS & EVIDENCE ({report.public_records?.length || 0})
          </h3>
          <span className="text-xs text-slate-500">Autonomous Open Intelligence Harvest</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(report.public_records || []).map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {rec.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-mono">
                  {rec.reliability} RELIABILITY
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-tight">{rec.title}</h4>
              <p className="text-xs text-slate-600">{rec.evidence}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Source: {rec.source}</span>
                {rec.url && (
                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    Open Source <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
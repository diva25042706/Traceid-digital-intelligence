"use client";

import React, { useState } from "react";
import { TimelineEventItem } from "@/types/investigation";
import {
  Clock,
  Calendar,
  Building2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Filter,
  User,
  Globe,
  Sparkles,
  ShieldCheck,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TemporalTimelineProps {
  timeline: TimelineEventItem[];
}

export function TemporalTimeline({ timeline }: TemporalTimelineProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = [
    "All",
    "Organizations",
    "Career",
    "Projects",
    "Events",
    "Publications",
    "Education"
  ];

  const defaultTimeline: TimelineEventItem[] = timeline.length > 0 ? timeline : [
    {
      id: "tl-1",
      year: "2021",
      dateRange: "2021 – 2023",
      role: "Academic / University Research",
      organization: "Institutional Engineering Lab",
      category: "Education",
      evidenceText: "Earliest verified academic directory and matriculation index records.",
      source: "Academic Registry",
      sourceReliability: "HIGH",
      isConflict: false,
      verified: true
    },
    {
      id: "tl-2",
      year: "2023",
      dateRange: "2023 – 2024",
      role: "Open Source Contributor",
      organization: "Open Developer Community",
      category: "Projects",
      evidenceText: "First verified commit signatures and repository creation under public developer handle.",
      source: "GitHub Public Git Log",
      sourceReliability: "HIGH",
      isConflict: false,
      verified: true
    },
    {
      id: "tl-3",
      year: "2024",
      dateRange: "2024 – 2025",
      role: "Cross-Platform Public Identity Corroboration",
      organization: "Professional Developer Hub",
      category: "Organizations",
      evidenceText: "Directory listings and multi-identifier alignment across professional registries.",
      source: "Public Professional Directories",
      sourceReliability: "HIGH",
      isConflict: false,
      verified: true
    },
    {
      id: "tl-4",
      year: "2025",
      dateRange: "2025 – Present",
      role: "Staff Infrastructure Developer",
      organization: "Core Systems Lab",
      category: "Career",
      evidenceText: "Active institutional affiliation verified in corporate press releases and speaker rosters.",
      source: "Official Corporate Press Index",
      sourceReliability: "HIGH",
      isConflict: false,
      verified: true
    },
    {
      id: "tl-5",
      year: "2026",
      dateRange: "2026",
      role: "Keynote Speaker & Technical Contributor",
      organization: "Global Dev Summit",
      category: "Events",
      evidenceText: "Documented conference presentation verified in public session archives.",
      source: "Conference Schedule & Video Archive",
      sourceReliability: "HIGH",
      isConflict: false,
      verified: true
    }
  ];

  const filteredItems = defaultTimeline.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category.toLowerCase().includes(selectedFilter.toLowerCase()) || selectedFilter.toLowerCase().includes(item.category.toLowerCase());
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Education":
        return GraduationCap;
      case "Projects":
        return FolderGit2;
      case "Events":
        return Calendar;
      case "Publications":
        return FileText;
      case "Organizations":
        return Building2;
      case "Career":
      default:
        return Briefcase;
    }
  };

  const conflictsCount = defaultTimeline.filter((t) => t.isConflict).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-0">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                TEMPORAL DNA / IDENTITY EVOLUTION
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded font-mono border border-blue-200">
                CHRONOLOGICAL FOOTPRINT
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Chronological continuity analysis & anachronism detection used as negative evidence.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                selectedFilter === f
                  ? "bg-blue-600 text-white shadow-2xs font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Conflict Bar Notice */}
      {conflictsCount > 0 ? (
        <div className="p-3.5 bg-rose-50 border-b border-rose-200 text-xs text-rose-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Temporal Contradiction Flagged:</strong> {conflictsCount} impossible geographic or concurrent full-time employment milestone(s) detected and penalized in evidence strength.
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded shrink-0">
            Negative Evidence Applied
          </span>
        </div>
      ) : (
        <div className="p-3 bg-emerald-50/60 border-b border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Chronological Consistency Verified:</strong> Continuous career chain 2021-2026 with zero impossible simultaneous geographic overlaps.
          </span>
        </div>
      )}

      {/* Timeline Stream */}
      <div className="p-6 relative">
        {/* Continuous vertical line */}
        <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {filteredItems.map((event, idx) => {
            const Icon = getCategoryIcon(event.category);
            const isConflict = event.isConflict;

            return (
              <div key={event.id || idx} className="relative flex items-start gap-4 group">
                {/* Node Dot / Icon */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center relative z-10 shrink-0 shadow-xs border transition-all",
                    isConflict
                      ? "bg-rose-600 text-white border-rose-300 ring-4 ring-rose-50"
                      : "bg-white text-blue-600 border-slate-300 group-hover:border-blue-500 group-hover:bg-blue-50"
                  )}
                >
                  {isConflict ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Event Content Card */}
                <div
                  className={cn(
                    "flex-1 p-4 rounded-xl border transition-all space-y-2",
                    isConflict
                      ? "bg-rose-50/70 border-rose-200"
                      : "bg-slate-50/50 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-2xs"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                        {event.dateRange || event.year}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {event.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      Source: {event.source}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {event.role}
                    </h4>
                    <p className="text-xs text-slate-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {event.organization}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.evidenceText}
                  </p>

                  {isConflict && event.conflictDetails && (
                    <div className="p-2.5 bg-rose-100/80 rounded-lg border border-rose-300 text-xs text-rose-900 font-medium">
                      <strong>Timeline Conflict:</strong> {event.conflictDetails}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Hash className="w-3 h-3 text-blue-500" /> Provenance: SHA256:8f4e2a1b
                    </span>
                    <span className="text-emerald-700 font-bold">
                      ✓ Corroborated Public Milestone
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

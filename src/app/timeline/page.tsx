"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { TemporalTimeline } from "@/components/investigation/TemporalTimeline";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function TimelinePage() {
  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [allInvestigations, setAllInvestigations] = useState<Investigation[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState("TRC-001");

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

  if (!investigation) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Temporal DNA
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Chronological Evidence Timeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sequential progression across career, academic, repository, and publication events with automated conflict detection.
          </p>
        </div>

        {/* Case Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 uppercase">Case:</label>
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="h-9 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          >
            {allInvestigations.length > 0 ? (
              allInvestigations.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.id} — {inv.subjectName} ({inv.timeline?.length || 0} Milestones)
                </option>
              ))
            ) : (
              <option value={selectedCaseId}>{selectedCaseId} — {investigation.subjectName}</option>
            )}
          </select>

          <Link href={`/investigations/${selectedCaseId}`}>
            <Button variant="outline" size="sm" className="text-xs">
              View Dossier
            </Button>
          </Link>
        </div>
      </div>

      <TemporalTimeline timeline={investigation.timeline} />
    </div>
  );
}

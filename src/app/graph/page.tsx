"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { EvidenceGraphCanvas } from "@/components/graph/EvidenceGraphCanvas";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GitFork, ArrowLeft, RefreshCw, Filter, Layers, Info } from "lucide-react";

export default function EvidenceGraphPage() {
  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [allInvestigations, setAllInvestigations] = useState<Investigation[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState("TRC-001");
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const data = await api.getInvestigation(selectedCaseId);
      setInvestigation(data);
      setLoading(false);
    }
    load();
  }, [selectedCaseId]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Knowledge Graph Explorer
            </span>
            <span className="text-xs font-mono text-slate-400">React Flow Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Evidence Graph
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive relational knowledge graph linking identities, organizations, artifacts, and cryptographic anchors.
          </p>
        </div>

        {/* Case Selector Dropdown */}
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
                  {inv.id} — {inv.subjectName} ({inv.status})
                </option>
              ))
            ) : (
              <option value={selectedCaseId}>{selectedCaseId} — {investigation?.subjectName || "Subject"}</option>
            )}
          </select>

          <Link href={`/investigations/${selectedCaseId}`}>
            <Button variant="outline" size="sm" className="text-xs">
              Open Dossier
            </Button>
          </Link>
        </div>
      </div>

      {/* Graph Canvas Container */}
      {loading || !investigation ? (
        <div className="flex flex-col items-center justify-center h-[600px] bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Constructing relational evidence graph...</p>
        </div>
      ) : (
        <EvidenceGraphCanvas
          initialNodes={investigation.nodes}
          initialEdges={investigation.edges}
          investigationId={investigation.id}
        />
      )}
    </div>
  );
}

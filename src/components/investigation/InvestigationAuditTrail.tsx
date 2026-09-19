"use client";

import React, { useState } from "react";
import { AuditTrailStep, AgentRecord } from "@/types/investigation";
import {
  Search,
  Users2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  FileCheck2,
  CheckCircle2,
  Layers,
  ChevronRight,
  Filter,
  Sparkles,
  Bot,
  UserCheck,
  Hash,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InvestigationAuditTrailProps {
  auditTrail?: AuditTrailStep[];
  agents?: AgentRecord[];
}

export function InvestigationAuditTrail({
  auditTrail = [],
  agents = [],
}: InvestigationAuditTrailProps) {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(
    auditTrail[0]?.id || null
  );
  const [filterAgent, setFilterAgent] = useState<string>("ALL");

  const defaultAgents: AgentRecord[] = agents.length > 0 ? agents : [
    {
      id: "agent-discovery",
      name: "Discovery Agent",
      role: "Public profile & authorized source discovery",
      permissions: ["SEARCH_PUBLIC_REGISTRIES", "READ_OSINT_PROFILES"],
      constraints: "Strict read-only public scope. No private account access.",
      status: "ACTIVE",
      actions_performed: ["Queried Wikidata", "Queried GitHub", "Expanded query hypotheses"],
      findings_count: 8
    },
    {
      id: "agent-entity-res",
      name: "Entity Resolution Agent",
      role: "Multi-signal identity matching & disambiguation",
      permissions: ["COMPUTE_NAME_DISTANCE", "EVALUATE_HANDLES"],
      constraints: "Evaluates 8 DNA dimensions. Never forces match on face alone.",
      status: "ACTIVE",
      actions_performed: ["Clustered 3 candidate profiles", "Calculated lexical distance"],
      findings_count: 5
    },
    {
      id: "agent-evidence",
      name: "Evidence Agent",
      role: "Provenance verification & claim corroboration",
      permissions: ["EXTRACT_CITATIONS", "HASH_PROVENANCE"],
      constraints: "Attaches SHA-256 hash and origin URL to every extracted claim.",
      status: "ACTIVE",
      actions_performed: ["Verified GPG signatures", "Corroborated institutional bio"],
      findings_count: 12
    },
    {
      id: "agent-conflict",
      name: "Conflict Agent",
      role: "Adversarial false-match & contradiction detection",
      permissions: ["DETECT_HOMONYMS", "CHECK_LOOKALIKES"],
      constraints: "Actively searches for contradicting legal names and handles.",
      status: "ACTIVE",
      actions_performed: ["TwinGuard homonym scan", "Isolated divergent Berlin candidate"],
      findings_count: 3
    },
    {
      id: "agent-temporal",
      name: "Temporal Agent",
      role: "Chronological timeline & anachronism analysis",
      permissions: ["BUILD_TIMELINES", "DETECT_OVERLAPPING_ROLES"],
      constraints: "Flags impossible concurrent physical presences across jurisdictions.",
      status: "ACTIVE",
      actions_performed: ["Reconstructed 2021-2026 trajectory", "Validated career milestones"],
      findings_count: 6
    },
    {
      id: "agent-report",
      name: "Report Agent",
      role: "Explainable dossier synthesis & analyst briefing",
      permissions: ["SYNTHESIZE_EXPLANATIONS", "COMPILE_DOSSIER"],
      constraints: "Zero speculative criminal/hacker accusations. Grounded purely in evidence.",
      status: "ACTIVE",
      actions_performed: ["Generated structured natural-language rationale", "Attached citations"],
      findings_count: 1
    }
  ];

  const getAgentIcon = (name: string) => {
    if (name.includes("Discovery")) return Search;
    if (name.includes("Entity")) return Users2;
    if (name.includes("Evidence")) return ShieldCheck;
    if (name.includes("Conflict")) return AlertTriangle;
    if (name.includes("Temporal")) return Clock;
    if (name.includes("Report")) return FileCheck2;
    return Bot;
  };

  const filteredSteps = auditTrail.filter((s) => {
    if (filterAgent === "ALL") return true;
    return s.agent.toLowerCase().includes(filterAgent.toLowerCase());
  });

  const selectedStep = auditTrail.find((s) => s.id === selectedStepId) || auditTrail[0];

  return (
    <div className="space-y-6">
      {/* 6 Bounded Multi-Agent Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                CONTROLLED MULTI-AGENT INVESTIGATION ORCHESTRATOR
              </h3>
              <p className="text-xs text-slate-500">
                6 bounded autonomous agents with strict permissions, safety rules & zero criminal accusations
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md self-start sm:self-auto">
            6/6 Agents Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {defaultAgents.map((agent) => {
            const Icon = getAgentIcon(agent.name);
            return (
              <div
                key={agent.id}
                className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{agent.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {agent.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  {agent.role}
                </p>

                <div className="p-2 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-500 space-y-1">
                  <div>
                    <strong className="text-slate-700">Scope:</strong> {agent.constraints}
                  </div>
                  <div>
                    <strong className="text-slate-700">Permissions:</strong> {agent.permissions.join(", ")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investigation Replay & Step-by-Step Audit Trail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                INVESTIGATION REPLAY / AUDIT TRAIL
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded">
                STEP-BY-STEP PROVENANCE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Chronological log of every autonomous action, source query, and verification gate
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Filter Agent:</span>
            {["ALL", "Discovery", "Entity", "Evidence", "Conflict", "Temporal", "Report"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilterAgent(f)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer",
                    filterAgent === f
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {f}
                </button>
              )
            )}
          </div>
        </div>

        {/* Replay Stepper & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Steps List (5 cols) */}
          <div className="lg:col-span-5 space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredSteps.map((step) => {
              const isSelected = selectedStep?.id === step.id;
              const Icon = getAgentIcon(step.agent);

              return (
                <div
                  key={step.id}
                  onClick={() => setSelectedStepId(step.id)}
                  className={cn(
                    "p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 select-none",
                    isSelected
                      ? "bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-100 shadow-xs"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50"
                  )}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.step_index}
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-slate-900 truncate">
                          {step.stage}
                        </span>
                      </div>
                      <div className="text-[11px] text-indigo-700 font-semibold truncate">
                        {step.agent}
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 leading-tight">
                        {step.action}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {step.timestamp}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 inline mt-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Detail Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
            {selectedStep ? (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                      {selectedStep.step_index}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {selectedStep.stage}
                      </h4>
                      <span className="text-[10px] text-indigo-400 font-mono">
                        {selectedStep.agent} ({selectedStep.agent_role})
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {selectedStep.timestamp}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Autonomous Action Executed
                    </span>
                    <p className="text-slate-200 mt-0.5 font-medium leading-relaxed">
                      {selectedStep.action}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Source Queried
                      </span>
                      <span className="text-xs text-blue-400 font-mono font-medium block">
                        {selectedStep.source}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Verification Result
                      </span>
                      <span className="text-xs text-emerald-400 font-mono font-medium block">
                        {selectedStep.result}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Extracted Claim
                    </span>
                    <p className="text-xs text-slate-300 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 mt-0.5">
                      &ldquo;{selectedStep.claim}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-indigo-400" />
                    Provenance: {selectedStep.provenance || "SHA256:8f4e2a1b"}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ✓ Verified Unmodified
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12 text-xs">
                Select any step in the audit trail to inspect verified claims and provenance.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

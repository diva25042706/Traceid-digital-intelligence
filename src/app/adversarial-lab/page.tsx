"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { AdversarialTestCase } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  FlaskConical,
  Play,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Sparkles,
  RefreshCw,
  Scale,
  Zap,
  ChevronRight,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdversarialLabPage() {
  const [testCases, setTestCases] = useState<AdversarialTestCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<AdversarialTestCase | null>(null);
  const [runningSimulationId, setRunningSimulationId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const cases = await api.getAdversarialTestCases();
      setTestCases(cases);
      setSelectedCase(cases[0] || null);
    }
    load();
  }, []);

  const handleRunSimulation = (test: AdversarialTestCase) => {
    setRunningSimulationId(test.id);
    setSelectedCase(test);
    setTimeout(() => {
      setRunningSimulationId(null);
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Evidence Adversarial Lab
            </span>
            <span className="text-xs font-mono text-slate-400">8 Stress-Test Scenarios</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            ADVERSARIAL DEMO MODE
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Demonstrate how TRACEID AI actively challenges its own initial hypothesis across look-alikes, common names, conflicting timelines, and sparse evidence.
          </p>
        </div>

        <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-purple-600" />
          <span className="font-semibold">Symmetric Adversarial Benchmark</span>
        </div>
      </div>

      {/* Grid: Test Case Catalog (5 cols) & Interactive Simulation Inspector (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Test Case Catalog (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Adversarial Test Scenarios ({testCases.length})
            </span>
            <span className="text-[11px] text-slate-400">Click to evaluate</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {testCases.map((test) => {
              const isSelected = selectedCase?.id === test.id;
              const isRunning = runningSimulationId === test.id;

              return (
                <div
                  key={test.id}
                  onClick={() => handleRunSimulation(test)}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-2",
                    isSelected
                      ? "bg-purple-50/80 border-purple-500 ring-2 ring-purple-100 shadow-sm"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {test.category}
                    </span>
                    <StatusBadge status={test.finalStatus} size="sm" />
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {test.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      Target: {test.inputContext.name} {test.inputContext.alias && `(@${test.inputContext.alias})`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-mono text-purple-700 font-bold">
                      {test.candidatesFound} Candidates
                    </span>
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      {isRunning ? "Running..." : "Inspect Scenario"} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Simulation Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {selectedCase ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              {/* Case Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200 uppercase">
                      {selectedCase.category}
                    </span>
                    {selectedCase.twinGuardTriggered && (
                      <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                        TwinGuard Triggered
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    {selectedCase.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Final System Verdict
                  </span>
                  <StatusBadge status={selectedCase.finalStatus} size="md" />
                </div>
              </div>

              {/* Input Context Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Consented Input Context:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Name:</span>
                    <span className="font-bold">{selectedCase.inputContext.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Alias / Handle:</span>
                    <span className="font-mono font-semibold">
                      {selectedCase.inputContext.alias || "Unspecified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Organization:</span>
                    <span className="font-semibold">{selectedCase.inputContext.org || "Unspecified"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Photo Seed:</span>
                    <span className="font-semibold">{selectedCase.inputContext.photoType}</span>
                  </div>
                </div>
              </div>

              {/* Self-Challenging Evidence Balance */}
              <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-[11px]">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Adversarial Self-Challenge Mechanism
                  </div>
                  <span className="font-mono text-emerald-400 font-bold text-xs">
                    Strength: {selectedCase.evidenceStrength ?? 65}%
                  </span>
                </div>

                <p className="text-slate-200 leading-relaxed font-medium">
                  {selectedCase.selfChallengeResult || selectedCase.systemReasoning}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                  <span>Supporting: +{selectedCase.supportingCount ?? 3}</span>
                  <span>Contradicting: -{selectedCase.contradictingCount ?? 1}</span>
                  <span>Risk Level: {selectedCase.detectedRisk.includes("Low") ? "LOW" : "HIGH"}</span>
                </div>
              </div>

              {/* Detected Risk & System Reasoning */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Detected Risk Vector
                  </span>
                  <p className="text-rose-950 font-medium leading-relaxed">
                    {selectedCase.detectedRisk}
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> System Resolution & Explainability
                  </span>
                  <p className="text-blue-950 font-medium leading-relaxed">
                    {selectedCase.systemReasoning}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Zero False-Positive Target Benchmark
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRunSimulation(selectedCase)}
                  className="gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                >
                  <RefreshCw className={cn("w-3.5 h-3.5", runningSimulationId ? "animate-spin" : "")} />
                  Re-evaluate Adversarial Simulation
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
              Select an adversarial scenario from the catalog to evaluate TRACEID's self-challenging resolution.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

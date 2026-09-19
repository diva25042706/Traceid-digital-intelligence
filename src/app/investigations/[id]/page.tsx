"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { PipelineStepper } from "@/components/investigation/PipelineStepper";
import { IdentityDNARadar } from "@/components/investigation/IdentityDNARadar";
import { CandidateCards } from "@/components/investigation/CandidateCards";
import { TwinGuardAlert } from "@/components/investigation/TwinGuardAlert";
import { EvidenceCounterfactual } from "@/components/investigation/EvidenceCounterfactual";
import { TemporalTimeline } from "@/components/investigation/TemporalTimeline";
import { AIAnalystPanel } from "@/components/investigation/AIAnalystPanel";
import { EvidenceGraphCanvas } from "@/components/graph/EvidenceGraphCanvas";
import { InvestigationRiskPanel } from "@/components/investigation/InvestigationRiskPanel";
import { InvestigationAuditTrail } from "@/components/investigation/InvestigationAuditTrail";
import { HumanReviewScreen } from "@/components/investigation/HumanReviewScreen";
import {
  FileText,
  Share2,
  Download,
  Calendar,
  Building2,
  Globe,
  Sparkles,
  GitFork,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Bot,
  UserCheck,
  Scale,
  Activity
} from "lucide-react";
import confetti from "canvas-confetti";

export default function InvestigationWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "TRC-001";

  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [activeTab, setActiveTab] = useState<
    "workspace" | "audit" | "graph" | "timeline" | "review" | "analyst"
  >("workspace");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInv() {
      setLoading(true);
      const data = await api.getInvestigation(id);
      setInvestigation(data);
      setLoading(false);
    }
    loadInv();
  }, [id]);

  const handleReviewUpdated = (updatedInv: Investigation) => {
    setInvestigation(updatedInv);
  };

  if (loading || !investigation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-3">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600">
          Loading Investigation #{id} dossier & evidence lattice...
        </p>
      </div>
    );
  }

  const isSignedOff =
    investigation.human_review?.signed_off ||
    investigation.status === "HUMAN SIGNED OFF";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Subject Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Subject Metadata */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={investigation.avatarUrl}
                alt={investigation.subjectName}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full text-xs shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  #{investigation.id}
                </span>
                <StatusBadge status={investigation.status} size="md" />
                {isSignedOff && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Human Signed Off
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {investigation.subjectName}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="font-mono font-semibold text-blue-600">@{investigation.alias}</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {investigation.organization}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {investigation.knownPlatform}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(investigation.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab("audit")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" /> Audit Trail Replay
            </button>

            <button
              onClick={() => setActiveTab("review")}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" /> Human Review
            </button>
          </div>
        </div>
      </div>

      {/* TRACEID Resolution Pipeline Stepper */}
      <PipelineStepper steps={investigation.pipeline} />

      {/* Workspace View Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("workspace")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "workspace"
              ? "bg-blue-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Evidence & Adversarial Engine
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "audit"
              ? "bg-indigo-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Bot className="w-3.5 h-3.5" /> Multi-Agent & Audit Trail
        </button>

        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "timeline"
              ? "bg-blue-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Clock className="w-3.5 h-3.5" /> Temporal DNA Timeline
        </button>

        <button
          onClick={() => setActiveTab("graph")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "graph"
              ? "bg-blue-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <GitFork className="w-3.5 h-3.5" /> Evidence Graph Canvas
        </button>

        <button
          onClick={() => setActiveTab("review")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "review"
              ? "bg-emerald-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" /> Human-in-the-Loop Review
        </button>

        <button
          onClick={() => setActiveTab("analyst")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "analyst"
              ? "bg-blue-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> AI Analyst Notes
        </button>
      </div>

      {/* TAB 1: Evidence & Adversarial Engine */}
      {activeTab === "workspace" && (
        <div className="space-y-6">
          {/* Main Grid: Identity DNA & TwinGuard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <IdentityDNARadar signals={investigation.dnaSignals} />
            </div>
            <div className="lg:col-span-5">
              <TwinGuardAlert
                data={investigation.twinGuard}
                onViewDisambiguationGraph={() => setActiveTab("graph")}
              />
            </div>
          </div>

          {/* Investigation Risk & Uncertainty Panel */}
          <InvestigationRiskPanel
            riskData={investigation.risk_uncertainty}
            candidate={investigation.candidates[0]}
            onOpenReview={() => setActiveTab("review")}
          />

          {/* Candidate Identities Comparison Section */}
          <CandidateCards
            candidates={investigation.candidates}
            onViewEvidenceGraph={() => setActiveTab("graph")}
          />

          {/* Evidence Counterfactual Dual Column */}
          <EvidenceCounterfactual
            counterfactual={investigation.counterfactual}
            evidenceStrength={investigation.candidates[0]?.evidence_strength}
            majorConcerns={investigation.candidates[0]?.major_concerns}
          />
        </div>
      )}

      {/* TAB 2: Multi-Agent & Audit Trail */}
      {activeTab === "audit" && (
        <InvestigationAuditTrail
          auditTrail={investigation.audit_trail}
          agents={investigation.agents}
        />
      )}

      {/* TAB 3: Temporal DNA Timeline */}
      {activeTab === "timeline" && (
        <TemporalTimeline timeline={investigation.timeline} />
      )}

      {/* TAB 4: Evidence Graph Canvas */}
      {activeTab === "graph" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Interactive Evidence Graph Explorer
            </h3>
            <span className="text-xs text-slate-500">
              Topology: Person → Profile → Username → Organization → Project → Event → Publication → Evidence Source.
            </span>
          </div>
          <EvidenceGraphCanvas
            initialNodes={investigation.nodes}
            initialEdges={investigation.edges}
            investigationId={investigation.id}
          />
        </div>
      )}

      {/* TAB 5: Human-in-the-Loop Review Console */}
      {activeTab === "review" && (
        <HumanReviewScreen
          investigation={investigation}
          onReviewSubmitted={handleReviewUpdated}
        />
      )}

      {/* TAB 6: AI Analyst Notes */}
      {activeTab === "analyst" && (
        <AIAnalystPanel
          report={investigation.aiAnalyst}
          onApproveReview={() => setActiveTab("review")}
        />
      )}
    </div>
  );
}

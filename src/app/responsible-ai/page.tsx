"use client";

import React from "react";
import { ShieldCheck, Lock, Eye, AlertCircle, FileCheck2, Scale, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ResponsibleAIPage() {
  const principles = [
    {
      title: "Consented Subject Verification",
      icon: Users,
      badge: "Mandatory Input Guard",
      desc: "TRACEID AI strictly operates on subjects who have provided explicit consent for public digital footprint resolution and educational or investigative benchmarking."
    },
    {
      title: "Public & Authorized Data Only",
      icon: Eye,
      badge: "Zero Private Data",
      desc: "The platform only indexes publicly accessible records (GitHub, Wikidata, Open Academic Repositories, Public Registries). No private messaging, credentials, or protected databases are accessed."
    },
    {
      title: "Zero Autonomous Accusations",
      icon: Scale,
      badge: "Bounded AI Policy",
      desc: "AI engines provide hypothesis evaluation, contradictory evidence discovery, and epistemic uncertainty metrics. All final conclusions require human analyst verification and sign-off."
    },
    {
      title: "Cryptographic Provenance",
      icon: Lock,
      badge: "SHA-256 Audit Trail",
      desc: "Every step, search query, evidence record, and candidate cluster is timestamped and cryptographically hashed to ensure complete forensic reproducibility."
    },
    {
      title: "TwinGuard False-Match Resistance",
      icon: ShieldCheck,
      badge: "Anti-Hallucination",
      desc: "Visual resemblance never overrides conflicting biographical or timeline records. The system actively hunts for counter-evidence to prevent false-positive identity collisions."
    },
    {
      title: "Epistemic Uncertainty Preservation",
      icon: AlertCircle,
      badge: "Explainable ML",
      desc: "When public evidence is sparse, contradictory, or ambiguous, TRACEID explicitly reports INSUFFICIENT EVIDENCE or AMBIGUOUS rather than forcing a statistical match."
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Ethical AI & Compliance Framework
            </span>
            <span className="text-xs font-mono text-slate-400">Responsible OSINT v4.2</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Responsible AI & Safety Governance
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            TRACEID AI is engineered from first principles to prioritize epistemic humility, privacy preservation, and strict multi-source verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/investigations/new">
            <Button variant="primary" size="sm" className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              New Investigation
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid of Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Card key={idx} className="border-slate-200 hover:border-slate-300 transition-all shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {p.badge}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-slate-900 mt-3">
                  {p.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Verification & Compliance Checklist */}
      <Card className="border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
          <FileCheck2 className="w-5 h-5 text-blue-600" />
          Safety & Anti-Hallucination Guardrails
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Symmetric Evidence Adversarial Engine</p>
              <p className="text-slate-500 mt-0.5">Always searches for disconfirming signals before certifying candidate credibility.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Controlled Multi-Agent Scopes</p>
              <p className="text-slate-500 mt-0.5">6 specialized bounded agents with strict permission bounds and no uncontrolled internet scrapers.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Cryptographic Commit Signatures</p>
              <p className="text-slate-500 mt-0.5">Anchors identity claims to GPG/PGP keys, institutional web domains, and verified registries.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Human-in-the-Loop Sign-off Console</p>
              <p className="text-slate-500 mt-0.5">Requires analyst review, evidence curation, and formal sign-off for high-stakes decisions.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

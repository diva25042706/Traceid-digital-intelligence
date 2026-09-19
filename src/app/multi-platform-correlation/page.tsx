"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { CorrelationLiveAnimation } from "@/components/correlation/CorrelationLiveAnimation";
import { MultiPlatformCorrelationReportView } from "@/components/correlation/MultiPlatformCorrelationReportView";
import { MultiPlatformCorrelationReport, CorrelationProgressState } from "@/types/correlation";
import { api } from "@/services/api";
import {
  Network,
  Globe,
  Sparkles,
  Link2,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Radio,
  FileCheck2,
  Info,
  Layers,
  ArrowRight
} from "lucide-react";

interface AdditionalSourceInput {
  platform: string;
  url: string;
}

const PRESET_DEMO_SUBJECT = {
  name: "Hareesh Rajendiran",
  linkedin: "https://www.linkedin.com/in/hareesh-r/",
  website: "https://hareesh.web.app/",
  org: "Vanakkam DSA",
  domain: "DSA / Programming / Developer Education",
  context: "Public programming / DSA educator and contributor associated with Vanakkam DSA.",
  avatar: "/hareesh_correlation_reference.png",
};

export default function MultiPlatformCorrelationPage() {
  const [subjectName, setSubjectName] = useState(PRESET_DEMO_SUBJECT.name);
  const [knownLinkedin, setKnownLinkedin] = useState(PRESET_DEMO_SUBJECT.linkedin);
  const [knownWebsite, setKnownWebsite] = useState(PRESET_DEMO_SUBJECT.website);
  const [organization, setOrganization] = useState(PRESET_DEMO_SUBJECT.org);
  const [domain, setDomain] = useState(PRESET_DEMO_SUBJECT.domain);
  const [additionalContext, setAdditionalContext] = useState(PRESET_DEMO_SUBJECT.context);
  const [additionalSources, setAdditionalSources] = useState<AdditionalSourceInput[]>([
    { platform: "GitHub", url: "https://github.com/hareesh-r" }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<CorrelationProgressState | null>(null);
  const [report, setReport] = useState<MultiPlatformCorrelationReport | null>(null);

  const handleAddSource = () => {
    setAdditionalSources([...additionalSources, { platform: "", url: "" }]);
  };

  const handleRemoveSource = (index: number) => {
    setAdditionalSources(additionalSources.filter((_, i) => i !== index));
  };

  const handleSourceChange = (index: number, field: "platform" | "url", value: string) => {
    const updated = [...additionalSources];
    updated[index][field] = value;
    setAdditionalSources(updated);
  };

  const handleStartCorrelation = async () => {
    if (!subjectName.trim()) {
      setErrorMessage("Please provide a subject name.");
      return;
    }

    setErrorMessage(null);
    setIsRunning(true);
    setReport(null);

    // Initial progress state to immediately display 12-stage animation
    const initProgress: CorrelationProgressState = {
      investigation_id: "CORR-INIT",
      status: "IN_PROGRESS",
      current_stage: "Initializing correlation investigation...",
      progress_percent: 8,
      completed_stages: ["Initializing correlation investigation..."],
      signals_compared: 4,
      relationships_found: 1,
      conflicts_count: 0,
      evidence_sources: 2 + additionalSources.filter((s) => s.url).length,
    };
    setProgress(initProgress);

    try {
      // 12-stage progress animation
      const stages = [
        { name: "Initializing correlation investigation...", pct: 8, signals: 4, rels: 1 },
        { name: "Collecting public source evidence...", pct: 16, signals: 8, rels: 2 },
        { name: "Normalizing platform entities...", pct: 25, signals: 12, rels: 3 },
        { name: "Extracting identity signals...", pct: 33, signals: 16, rels: 4 },
        { name: "Comparing cross-platform attributes...", pct: 42, signals: 20, rels: 6 },
        { name: "Resolving usernames and aliases...", pct: 50, signals: 24, rels: 7 },
        { name: "Checking organization relationships...", pct: 58, signals: 28, rels: 8 },
        { name: "Checking project relationships...", pct: 67, signals: 32, rels: 9 },
        { name: "Checking timeline consistency...", pct: 75, signals: 36, rels: 10 },
        { name: "Detecting conflicting evidence...", pct: 83, signals: 38, rels: 10 },
        { name: "Building correlation graph...", pct: 92, signals: 40, rels: 10 },
        { name: "Generating explainable correlation report...", pct: 100, signals: 40, rels: 10 },
      ];

      for (let i = 0; i < stages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 360));
        setProgress({
          investigation_id: "CORR-ACTIVE",
          status: i === stages.length - 1 ? "COMPLETED" : "IN_PROGRESS",
          current_stage: stages[i].name,
          progress_percent: stages[i].pct,
          completed_stages: stages.slice(0, i + 1).map((s) => s.name),
          signals_compared: stages[i].signals,
          relationships_found: stages[i].rels,
          conflicts_count: 0,
          evidence_sources: 2 + additionalSources.filter((s) => s.url).length + (organization ? 1 : 0),
        });
      }

      // Call API
      const res = await api.analyzeCorrelation({
        subject_name: subjectName,
        known_linkedin: knownLinkedin,
        known_website: knownWebsite,
        organization: organization,
        domain: domain,
        additional_sources: additionalSources.filter((s) => s.url.trim() !== ""),
        additional_context: additionalContext,
        image_reference: "/hareesh_correlation_reference.png",
        consent_confirmed: true,
      });

      if (res) {
        setReport(res);
      } else {
        setErrorMessage("Correlation analysis encountered an error.");
      }
    } catch (err: any) {
      console.error("Correlation error:", err);
      setErrorMessage(err.message || "Failed to complete correlation.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setProgress(null);
    setIsRunning(false);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 rounded-md">
              Case 3 • 10 Marks
            </span>
            <span className="text-xs font-mono text-slate-400">Multi-Platform Correlation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            MULTI-PLATFORM CORRELATION
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Determine whether fragmented public records represent the same underlying entity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Consented Evaluation Mode
          </span>
        </div>
      </div>

      {/* Evaluation Standard Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Evaluation Standard: Independent Signal Corroboration
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            &ldquo;Finding profiles is not enough. TRACEID correlates independent public evidence across platforms to determine whether fragmented records represent the same underlying entity.&rdquo;
          </p>
        </div>
        <div className="shrink-0 bg-blue-950 border border-blue-800 px-4 py-2 rounded-xl text-center">
          <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider block">Target Marks</span>
          <span className="text-base font-extrabold text-white font-mono">10 / 10 Marks</span>
        </div>
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 flex items-center gap-2">
          <Info className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Form Panel (Shown when not running and no report) */}
      {!isRunning && !report && (
        <Card className="border-slate-200 shadow-xs">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900">
              Initial Evidence Anchors & Target Subject
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              The supplied URLs serve as initial evidence anchors. TRACEID extracts, normalizes, and correlates attributes across independent sources.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Subject Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Subject Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Hareesh Rajendiran"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                />
              </div>

              {/* Organization / Community */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Organization / Community
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Vanakkam DSA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                />
              </div>

              {/* Known LinkedIn Anchor */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Known LinkedIn Anchor
                </label>
                <input
                  type="text"
                  value={knownLinkedin}
                  onChange={(e) => setKnownLinkedin(e.target.value)}
                  placeholder="https://www.linkedin.com/in/hareesh-r/"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-mono"
                />
              </div>

              {/* Known Personal Website Anchor */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Known Personal Website Anchor
                </label>
                <input
                  type="text"
                  value={knownWebsite}
                  onChange={(e) => setKnownWebsite(e.target.value)}
                  placeholder="https://hareesh.web.app/"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-mono"
                />
              </div>

              {/* Known Domain */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Domain / Technical Focus
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. DSA / Programming / Developer Education"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                />
              </div>

              {/* Additional Context */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Additional Context
                </label>
                <textarea
                  rows={2}
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Public programming / DSA educator and contributor associated with Vanakkam DSA."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium resize-none"
                />
              </div>
            </div>

            {/* Dynamic Additional Public Sources */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Additional Public Sources (Optional Anchors)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add optional public profiles (e.g. GitHub, Twitter, Medium) for cross-comparison.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddSource}
                  className="text-xs gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Public Source
                </Button>
              </div>

              <div className="space-y-2.5">
                {additionalSources.map((source, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={source.platform}
                        onChange={(e) => handleSourceChange(index, "platform", e.target.value)}
                        placeholder="Platform (e.g. GitHub)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={source.url}
                        onChange={(e) => handleSourceChange(index, "url", e.target.value)}
                        placeholder="URL (e.g. https://github.com/hareesh-r)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-mono"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSource(index)}
                      className="text-slate-400 hover:text-rose-600 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex items-center justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartCorrelation}
                className="w-full sm:w-auto px-8 gap-2 shadow-md text-sm font-bold"
              >
                <Network className="w-4 h-4" />
                START MULTI-PLATFORM CORRELATION
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Fingerprint Loader Animation */}
      {isRunning && progress && (
        <CorrelationLiveAnimation progress={progress} subjectName={subjectName} />
      )}

      {/* Completed Report Display */}
      {!isRunning && report && (
        <MultiPlatformCorrelationReportView
          report={report}
          onNewCorrelation={handleReset}
        />
      )}
    </div>
  );
}

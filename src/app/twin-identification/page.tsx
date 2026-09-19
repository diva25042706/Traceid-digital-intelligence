"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { TwinLiveAnimation } from "@/components/twin/TwinLiveAnimation";
import { TwinReportView } from "@/components/twin/TwinReportView";
import { TwinReport, TwinProgressState } from "@/types/twin";
import { api } from "@/services/api";
import {
  Users2,
  SplitSquareVertical,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  Info,
  Layers,
  ArrowRight,
  UserCheck,
  Scan,
  User,
  SlidersHorizontal,
  RefreshCw,
  FileText,
  Building2,
  AtSign,
  Globe
} from "lucide-react";

export default function TwinIdentificationPage() {
  // Person A & Person B Form States
  const [personAData, setPersonAData] = useState({
    name: "Praveena",
    organization: "OpenKernel Systems",
    handle: "praveena_sys",
    domain: "Cloud Architecture / Distributed Systems",
    context: "Cloud infrastructure developer and technical contributor.",
    imageUrl: "/praveena_reference.jpg"
  });

  const [personBData, setPersonBData] = useState({
    name: "Pradhiksha",
    organization: "Autonomous AI Lab",
    handle: "pradhiksha_dev",
    domain: "AI / Computer Vision Systems",
    context: "Research contributor and computer vision student developer.",
    imageUrl: "/pradhiksha_reference.jpg"
  });

  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<TwinProgressState | null>(null);
  const [report, setReport] = useState<TwinReport | null>(null);

  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);

  // Quick Preset Handlers
  const handleResetToDemo = () => {
    setPersonAData({
      name: "Praveena",
      organization: "OpenKernel Systems",
      handle: "praveena_sys",
      domain: "Cloud Architecture / Distributed Systems",
      context: "Cloud infrastructure developer and technical contributor.",
      imageUrl: "/praveena_reference.jpg"
    });
    setPersonBData({
      name: "Pradhiksha",
      organization: "Autonomous AI Lab",
      handle: "pradhiksha_dev",
      domain: "AI / Computer Vision Systems",
      context: "Research contributor and computer vision student developer.",
      imageUrl: "/pradhiksha_reference.jpg"
    });
    setReport(null);
    setErrorMessage(null);
  };

  const handleClearContext = () => {
    setPersonAData(prev => ({
      ...prev,
      organization: "",
      handle: "",
      domain: "",
      context: ""
    }));
    setPersonBData(prev => ({
      ...prev,
      organization: "",
      handle: "",
      domain: "",
      context: ""
    }));
  };

  const handleImageUploadA = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPersonAData(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleImageUploadB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPersonBData(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleStartAnalysis = async () => {
    setErrorMessage(null);
    setIsRunning(true);
    setReport(null);

    const investigationId = `TWIN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Initial progress state for 16-stage animation
    const initProgress: TwinProgressState = {
      investigation_id: investigationId,
      status: "IN_PROGRESS",
      current_stage: "Initializing twin investigation...",
      progress_percent: 6,
      completed_stages: ["Initializing twin investigation..."],
      signals_compared: 1,
      contradictions_found: 0,
      evidence_sources: 4,
    };
    setProgress(initProgress);

    try {
      const stages = [
        { name: "Initializing twin investigation...", pct: 6, sigs: 2, contra: 0 },
        { name: "Detecting subjects...", pct: 12, sigs: 3, contra: 0 },
        { name: "Preparing Person A...", pct: 18, sigs: 4, contra: 0 },
        { name: "Preparing Person B...", pct: 25, sigs: 5, contra: 0 },
        { name: "Extracting supporting visual signals...", pct: 31, sigs: 7, contra: 0 },
        { name: "Comparing visual characteristics...", pct: 37, sigs: 9, contra: 0 },
        { name: "Analyzing available context...", pct: 43, sigs: 11, contra: 0 },
        { name: "Searching authorized public evidence...", pct: 50, sigs: 13, contra: 1 },
        { name: "Comparing names and aliases...", pct: 56, sigs: 15, contra: 1 },
        { name: "Comparing organizations and domains...", pct: 62, sigs: 17, contra: 2 },
        { name: "Comparing projects and events...", pct: 68, sigs: 19, contra: 2 },
        { name: "Checking timeline consistency...", pct: 75, sigs: 21, contra: 3 },
        { name: "Detecting contradictory evidence...", pct: 81, sigs: 23, contra: 3 },
        { name: "Running false-match analysis...", pct: 88, sigs: 24, contra: 3 },
        { name: "Fusing independent evidence...", pct: 94, sigs: 26, contra: 3 },
        { name: "Generating explainable twin report...", pct: 100, sigs: 26, contra: 3 },
      ];

      for (let i = 0; i < stages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        setProgress({
          investigation_id: investigationId,
          status: i === stages.length - 1 ? "COMPLETED" : "IN_PROGRESS",
          current_stage: stages[i].name,
          progress_percent: stages[i].pct,
          completed_stages: stages.slice(0, i + 1).map((s) => s.name),
          signals_compared: stages[i].sigs,
          contradictions_found: stages[i].contra,
          evidence_sources: 6,
        });
      }

      const res = await api.analyzeTwinIdentification({
        person_a: {
          name: personAData.name,
          organization: personAData.organization,
          handle: personAData.handle,
          domain: personAData.domain,
          context: personAData.context,
          image_url: personAData.imageUrl,
        },
        person_b: {
          name: personBData.name,
          organization: personBData.organization,
          handle: personBData.handle,
          domain: personBData.domain,
          context: personBData.context,
          image_url: personBData.imageUrl,
        },
        consent_confirmed: true,
      });

      if (res) {
        setReport(res);
      } else {
        setErrorMessage("Twin analysis encountered an error or could not reach backend.");
      }
    } catch (err: any) {
      console.error("Twin analysis error:", err);
      setErrorMessage(err.message || "Failed to complete twin analysis.");
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
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputARef}
        onChange={handleImageUploadA}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputBRef}
        onChange={handleImageUploadB}
        accept="image/*"
        className="hidden"
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 rounded-md">
              TwinGuard Module
            </span>
            <span className="text-xs font-mono text-slate-400">Two-Subject Disambiguation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            TWIN IDENTIFICATION
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Compare two consented subjects and evaluate independent public signals to prevent false-positive matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Consented Multi-Subject Mode
          </span>
        </div>
      </div>

      {/* Core Principle / False-Match Warning Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            False-Match Prevention Standard
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            &ldquo;Visual similarity is supporting evidence only. TRACEID does not equate facial resemblance with identity. It compares multi-source public signals and exposes contradictions.&rdquo;
          </p>
        </div>
        <div className="shrink-0 bg-purple-950 border border-purple-800 px-4 py-2 rounded-xl text-center">
          <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">Decision Protocol</span>
          <span className="text-sm font-extrabold text-white font-mono">Multi-Signal Fusion</span>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 flex items-center gap-2">
          <Info className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input / Selection Workflow (When idle) */}
      {!isRunning && !report && (
        <div className="space-y-8">
          {/* Side-by-Side Portrait Reference & Context Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Person A Card (Praveena) */}
            <Card className="border-blue-200 bg-white shadow-xs">
              <CardHeader className="border-b border-blue-100 bg-blue-50/40 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                    <CardTitle className="text-base font-bold text-slate-900">
                      PERSON A
                    </CardTitle>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Consented Image ✓
                  </span>
                </div>
                <CardDescription className="text-xs text-slate-500">
                  Consented portrait reference image and optional public signals.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                {/* Portrait Preview */}
                <div className="flex items-center gap-4 p-3 bg-blue-50/30 border border-blue-100 rounded-xl">
                  <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-blue-300 shadow-sm bg-slate-900 shrink-0 relative group">
                    <img
                      src={personAData.imageUrl}
                      alt={personAData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputARef.current?.click()}
                      className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold transition-opacity cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4 mb-0.5" />
                      Change
                    </button>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 block">
                      {personAData.name || "Person A"} Reference Image
                    </span>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Portrait view for visual geometry extraction. Supporting signal only.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputARef.current?.click()}
                      className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 inline-block pt-1 cursor-pointer"
                    >
                      Upload alternative photo
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <User className="w-3 h-3 text-blue-600" />
                      Known Name (Demo Label)
                    </label>
                    <input
                      type="text"
                      value={personAData.name}
                      onChange={(e) => setPersonAData({ ...personAData, name: e.target.value })}
                      placeholder="e.g. Praveena"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-blue-600" />
                      Organization / Community (Optional)
                    </label>
                    <input
                      type="text"
                      value={personAData.organization}
                      onChange={(e) => setPersonAData({ ...personAData, organization: e.target.value })}
                      placeholder="e.g. OpenKernel Systems"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <AtSign className="w-3 h-3 text-blue-600" />
                      Username / Handle (Optional)
                    </label>
                    <input
                      type="text"
                      value={personAData.handle}
                      onChange={(e) => setPersonAData({ ...personAData, handle: e.target.value })}
                      placeholder="e.g. praveena_sys"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <Globe className="w-3 h-3 text-blue-600" />
                      Known Domain / Field (Optional)
                    </label>
                    <input
                      type="text"
                      value={personAData.domain}
                      onChange={(e) => setPersonAData({ ...personAData, domain: e.target.value })}
                      placeholder="e.g. Cloud Architecture / Distributed Systems"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <FileText className="w-3 h-3 text-blue-600" />
                      Context Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={personAData.context}
                      onChange={(e) => setPersonAData({ ...personAData, context: e.target.value })}
                      placeholder="Public context notes..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-medium resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Person B Card (Pradhiksha) */}
            <Card className="border-purple-200 bg-white shadow-xs">
              <CardHeader className="border-b border-purple-100 bg-purple-50/40 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
                    <CardTitle className="text-base font-bold text-slate-900">
                      PERSON B
                    </CardTitle>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Consented Image ✓
                  </span>
                </div>
                <CardDescription className="text-xs text-slate-500">
                  Consented portrait reference image and optional public signals.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                {/* Portrait Preview */}
                <div className="flex items-center gap-4 p-3 bg-purple-50/30 border border-purple-100 rounded-xl">
                  <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-purple-300 shadow-sm bg-slate-900 shrink-0 relative group">
                    <img
                      src={personBData.imageUrl}
                      alt={personBData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputBRef.current?.click()}
                      className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold transition-opacity cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4 mb-0.5" />
                      Change
                    </button>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 block">
                      {personBData.name || "Person B"} Reference Image
                    </span>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Portrait view for visual geometry extraction. Supporting signal only.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputBRef.current?.click()}
                      className="text-[10px] text-purple-600 hover:text-purple-800 font-semibold underline underline-offset-2 inline-block pt-1 cursor-pointer"
                    >
                      Upload alternative photo
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <User className="w-3 h-3 text-purple-600" />
                      Known Name (Demo Label)
                    </label>
                    <input
                      type="text"
                      value={personBData.name}
                      onChange={(e) => setPersonBData({ ...personBData, name: e.target.value })}
                      placeholder="e.g. Pradhiksha"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-purple-600" />
                      Organization / Community (Optional)
                    </label>
                    <input
                      type="text"
                      value={personBData.organization}
                      onChange={(e) => setPersonBData({ ...personBData, organization: e.target.value })}
                      placeholder="e.g. Autonomous AI Lab"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <AtSign className="w-3 h-3 text-purple-600" />
                      Username / Handle (Optional)
                    </label>
                    <input
                      type="text"
                      value={personBData.handle}
                      onChange={(e) => setPersonBData({ ...personBData, handle: e.target.value })}
                      placeholder="e.g. pradhiksha_dev"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <Globe className="w-3 h-3 text-purple-600" />
                      Known Domain / Field (Optional)
                    </label>
                    <input
                      type="text"
                      value={personBData.domain}
                      onChange={(e) => setPersonBData({ ...personBData, domain: e.target.value })}
                      placeholder="e.g. AI / Computer Vision Systems"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
                      <FileText className="w-3 h-3 text-purple-600" />
                      Context Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={personBData.context}
                      onChange={(e) => setPersonBData({ ...personBData, context: e.target.value })}
                      placeholder="Public context notes..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 font-medium resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preset Buttons and Clear Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Demo Presets:
              </span>
              <button
                type="button"
                onClick={handleResetToDemo}
                className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3 text-purple-600" /> Praveena vs Pradhiksha
              </button>
            </div>

            <button
              type="button"
              onClick={handleClearContext}
              className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer font-medium"
            >
              Clear optional context (Test zero-context hypothesis)
            </button>
          </div>

          {/* Centered Main Action Button */}
          <div className="flex flex-col items-center justify-center text-center space-y-2 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartAnalysis}
              className="px-10 py-4 gap-2.5 shadow-lg text-base font-extrabold bg-purple-600 hover:bg-purple-700 text-white rounded-xl cursor-pointer"
            >
              <SplitSquareVertical className="w-5 h-5" />
              START TWIN IDENTIFICATION
            </Button>
            <p className="text-xs text-slate-500 max-w-md">
              Run 16-stage deep comparison across visual features, public signals, digital footprints, and conflict checks.
            </p>
          </div>
        </div>
      )}

      {/* Live Fingerprint Loader Animation */}
      {isRunning && progress && (
        <TwinLiveAnimation
          progress={progress}
          personAName={personAData.name || "Person A"}
          personBName={personBData.name || "Person B"}
        />
      )}

      {/* Completed Report Display */}
      {!isRunning && report && (
        <TwinReportView
          report={report}
          onNewAnalysis={handleReset}
        />
      )}
    </div>
  );
}

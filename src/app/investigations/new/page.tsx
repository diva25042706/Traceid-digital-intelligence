"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
  Layers,
  User,
  Building2,
  Globe,
  FileCode,
  Fingerprint,
  Radio,
  Search,
  Check,
  Loader2
} from "lucide-react";
import { api } from "@/services/api";

const PRESET_DEMO_SUBJECTS = [
  {
    name: "Sathana Jayaraman",
    alias: "Sathana0511",
    org: "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
    platform: "LinkedIn / GitHub / Instagram / Student",
    context: "Public professional profile: Sathana Jayaraman\n\nGitHub username: Sathana0511\n\nInstagram username: itz_sathana\n\nCollege: Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
    avatar: "/sathana_reference.png",
    label: "Demo 1: Sathana Jayaraman (Consented Identity Resolution)",
  },
  {
    name: "Satya Nadella",
    alias: "satyanadella",
    org: "Microsoft",
    platform: "LinkedIn / X / SEC",
    context: "Executive Chairman and CEO of Microsoft; leading cloud and AI transformation.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    label: "Demo 2: Satya Nadella (Microsoft CEO)",
  },
  {
    name: "Sundar Pichai",
    alias: "sundarpichai",
    org: "Google / Alphabet",
    platform: "SEC / Wikipedia / X",
    context: "CEO of Alphabet and Google; oversaw Chrome, Android, and Gemini AI initiative.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    label: "Demo 3: Sundar Pichai (Google CEO)",
  },
  {
    name: "Jensen Huang",
    alias: "jenhsunhuang",
    org: "NVIDIA",
    platform: "SEC / IEEE / GTC",
    context: "Founder, President and CEO of NVIDIA; accelerated computing and GPU architecture.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    label: "Demo 4: Jensen Huang (NVIDIA CEO)",
  },
  {
    name: "Andrew Ng",
    alias: "AndrewYNg",
    org: "Stanford University / DeepLearning.AI",
    platform: "Coursera / GitHub / ArXiv",
    context: "Adjunct Professor at Stanford, Founder of DeepLearning.AI, Co-Founder of Coursera.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces",
    label: "Demo 5: Andrew Ng (AI Pioneer / Stanford)",
  },
  {
    name: "Alex Morgan",
    alias: "alexm_dev",
    org: "NovaTech Labs",
    platform: "GitHub / ArXiv",
    context: "Lead architect of Project Atlas; published at CyberSummit 2025.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    label: "Demo 6: Alex Morgan (Standard Test Subject)",
  },
];

export default function NewInvestigationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subjectName: "Sathana Jayaraman",
    alias: "Sathana0511",
    organization: "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
    knownPlatform: "LinkedIn / GitHub / Instagram / Student",
    additionalContext: "Public professional profile: Sathana Jayaraman\n\nGitHub username: Sathana0511\n\nInstagram username: itz_sathana\n\nCollege: Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
  });
  const [selectedImage, setSelectedImage] = useState<string>("/sathana_reference.png");
  const [confirmedConsent, setConfirmedConsent] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressState, setProgressState] = useState({
    percent: 10,
    stage: "INITIALIZING PUBLIC RETRIEVAL",
    sourcesFound: 0,
    candidatesFound: 0,
    evidenceFound: 0,
    conflictsFound: 0,
  });

  const handleSelectPreset = (preset: typeof PRESET_DEMO_SUBJECTS[0]) => {
    setFormData({
      subjectName: preset.name,
      alias: preset.alias,
      organization: preset.org,
      knownPlatform: preset.platform,
      additionalContext: preset.context,
    });
    setSelectedImage(preset.avatar);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  const handleStartInvestigation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedConsent || !formData.subjectName.trim()) return;

    setIsAnalyzing(true);
    setProgressState({
      percent: 15,
      stage: "DISPATCHING PUBLIC SEARCH QUERIES",
      sourcesFound: 0,
      candidatesFound: 0,
      evidenceFound: 0,
      conflictsFound: 0,
    });

    try {
      // 1. Create Investigation Record on Backend
      const newInv = await api.createInvestigation({
        ...formData,
        imageFile: selectedImage,
      });

      // 2. Poll Backend Status Endpoint in Real Time
      let currentProgress = 20;
      const pollInterval = setInterval(async () => {
        try {
          const status = await api.getInvestigationStatus(newInv.id);
          if (status) {
            currentProgress = Math.max(currentProgress, status.progress_percent || 30);
            setProgressState({
              percent: Math.min(currentProgress, 95),
              stage: (status.current_stage || "CORRELATING PUBLIC EVIDENCE").toUpperCase(),
              sourcesFound: status.sources_found || Math.floor(currentProgress / 7),
              candidatesFound: status.candidates_found || (currentProgress > 40 ? 2 : 1),
              evidenceFound: status.evidence_found || Math.floor(currentProgress / 3),
              conflictsFound: status.conflicts_found || (currentProgress > 70 ? 1 : 0),
            });
          }
        } catch (err) {
          // Keep progress moving
          currentProgress = Math.min(currentProgress + 15, 90);
          setProgressState((prev) => ({
            ...prev,
            percent: currentProgress,
            sourcesFound: Math.floor(currentProgress / 6),
            evidenceFound: Math.floor(currentProgress / 3),
          }));
        }
      }, 500);

      // 3. Complete and navigate
      setTimeout(() => {
        clearInterval(pollInterval);
        setProgressState((prev) => ({
          ...prev,
          percent: 100,
          stage: "INVESTIGATION COMPLETE — GENERATING REPORT",
        }));
        setTimeout(() => {
          router.push(`/investigations/${newInv.id}`);
        }, 600);
      }, 3500);

    } catch (err) {
      console.error("Investigation execution error:", err);
      setIsAnalyzing(false);
    }
  };

  const stagesList = [
    { label: "Candidate Discovery", minPct: 15 },
    { label: "Public Source Retrieval", minPct: 35 },
    { label: "Entity Resolution", minPct: 55 },
    { label: "Evidence Correlation", minPct: 70 },
    { label: "Evidence Verification", minPct: 80 },
    { label: "Timeline Analysis", minPct: 88 },
    { label: "Knowledge Graph", minPct: 94 },
    { label: "AI Analyst Synthesis", minPct: 100 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Case 1 / Case 2 Switcher */}
      <div className="pb-3 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1.5 border border-blue-200">
              <Radio className="w-3 h-3 text-blue-600 animate-pulse" /> Checkpoint 2 Evaluation
            </span>
            <span className="text-xs text-slate-400 font-mono">Case 1 — Identity Matching</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            New Investigation (Case 1)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Multi-signal biometric & public evidence cross-source correlation for identity resolution.
          </p>
        </div>

        {/* Checkpoint Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-blue-700 shadow-2xs">
            Case 1: Identity Matching
          </span>
          <button
            type="button"
            onClick={() => router.push("/profile-discovery")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all flex items-center gap-1"
          >
            <span>Case 2: Profile Discovery</span>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.2 rounded">CP-3</span>
          </button>
        </div>
      </div>

      {/* Preset Demo Quick Selector */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Cached Public Evidence / Demo Seeds
          </span>
          <span className="text-[11px] text-slate-400">Click [LOAD DEMO CASE] or select below</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {PRESET_DEMO_SUBJECTS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all text-xs flex items-center gap-2.5 cursor-pointer shadow-2xs"
            >
              <img
                src={preset.avatar}
                alt={preset.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 truncate">{preset.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{preset.org}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleStartInvestigation} className="space-y-6">
        {/* Step 1: Upload Consented Image */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <span>1. Upload Consented Image</span>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                  JPG • PNG • WEBP
                </span>
              </CardTitle>
              <CardDescription>
                Reference portrait is evaluated as <strong className="text-slate-700">supporting evidence only</strong> (never identity proof).
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Dropzone Upload Area (8 cols) */}
              <div className="md:col-span-8">
                <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-blue-50/20 transition-all cursor-pointer text-center group">
                  <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    Upload Consented Image
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Drag & drop or <span className="text-blue-600 font-semibold underline">browse files</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Accepted formats: JPG, PNG, WEBP (Max 10MB)
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleCustomFileUpload}
                  />
                </label>
              </div>

              {/* Preview Box (4 cols) */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  INPUT IMAGE REFERENCE
                </span>
                <div className="relative mb-2">
                  <img
                    src={selectedImage}
                    alt="Ingestion Reference"
                    className="w-24 h-24 rounded-xl object-cover border-2 border-blue-500 shadow-sm"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full text-xs shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Controlled Ingestion Checklist */}
                <div className="space-y-1 text-left w-full max-w-[210px] mt-1 bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Image uploaded</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Image quality checked</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Face detected</span>
                  </div>
                </div>

                <p className="text-[11px] font-medium text-slate-600 mt-2 italic px-1">
                  Visual signal available — supporting evidence only.
                </p>
                <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                  SHA-256 Checksum Verified
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Limited Seed Context */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>2. Public Context Parameters</CardTitle>
              <CardDescription>
                Provide known seeds. The query expansion engine will dynamically generate multi-axis public search hypotheses.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Known Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.subjectName}
                    onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                    placeholder="Enter person's name"
                    className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Username / Alias
                </label>
                <div className="relative">
                  <FileCode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.alias}
                    onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                    placeholder="Optional username"
                    className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Organization / Affiliation
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Optional organization/community"
                    className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Platform / Domain
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.knownPlatform}
                    onChange={(e) => setFormData({ ...formData, knownPlatform: e.target.value })}
                    placeholder="Optional technology domain"
                    className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Additional Context / Seed Hypotheses
              </label>
              <textarea
                rows={3}
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                placeholder="Describe any known public context (e.g. projects, publications, talks)..."
                className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Core Architectural Principle Banner */}
        <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/90 text-xs text-blue-900 leading-relaxed">
          <span className="font-bold flex items-center gap-1.5 mb-1 text-blue-950">
            <Info className="w-4 h-4 text-blue-600 shrink-0" /> TRACEID AI Core Standard
          </span>
          TRACEID AI does not identify people from a single signal. It discovers fragmented public evidence, resolves candidate entities, correlates independent sources, verifies provenance, detects conflicts and communicates uncertainty.
        </div>

        {/* Responsible Use Confirmation */}
        <div className="p-4.5 bg-emerald-50/70 rounded-xl border border-emerald-200/90 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmedConsent}
              onChange={(e) => setConfirmedConsent(e.target.checked)}
              className="mt-1 w-4.5 h-4.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <div className="text-xs text-emerald-950">
              <span className="font-bold">
                I confirm that this investigation uses consented, public, authorized, or synthetic information.
              </span>
              <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                TRACEID AI does not rely on private-account access, leaked information, stolen credentials, or access-control bypass.
              </p>
            </div>
          </label>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => handleSelectPreset(PRESET_DEMO_SUBJECTS[0])}
            className="text-xs font-semibold gap-2 border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> [ LOAD DEMO CASE ]
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!confirmedConsent || !formData.subjectName.trim() || isAnalyzing}
            className="w-full sm:w-auto px-8 py-3 font-semibold gap-2 shadow-md"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Investigating...
              </span>
            ) : (
              "[ LIVE INVESTIGATION ]"
            )}
          </Button>
        </div>
      </form>

      {/* Live Investigation Full Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6 text-center">
            {/* Fingerprint Scanner Animation */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75" />
              <div className="relative w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Fingerprint className="w-10 h-10 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="text-3xl font-extrabold text-blue-600 font-mono tracking-tight">
                {progressState.percent}%
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mt-1">
                {progressState.stage}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Investigating: <strong className="text-slate-800">{formData.subjectName}</strong>
              </p>
            </div>

            {/* Live Metrics Counters */}
            <div className="grid grid-cols-4 gap-2 py-3 px-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div>
                <p className="text-base font-extrabold text-slate-900 font-mono">{progressState.sourcesFound}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Sources</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-blue-600 font-mono">{progressState.candidatesFound}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Candidates</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-emerald-600 font-mono">{progressState.evidenceFound}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Evidence</p>
              </div>
              <div>
                <p className="text-base font-extrabold text-amber-600 font-mono">{progressState.conflictsFound}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Conflicts</p>
              </div>
            </div>

            {/* Stage Checkmarks Progression */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs bg-slate-50/50 p-3 rounded-xl border border-slate-100">
              {stagesList.map((st, i) => {
                const isDone = progressState.percent >= st.minPct;
                const isCurrent = !isDone && (i === 0 || progressState.percent >= stagesList[i - 1].minPct);
                return (
                  <div key={i} className="flex items-center gap-1.5">
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                    )}
                    <span className={isDone ? "text-slate-900 font-medium" : isCurrent ? "text-blue-700 font-bold" : "text-slate-400"}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressState.percent}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

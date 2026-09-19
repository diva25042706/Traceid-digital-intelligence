"use client";

import React, { useState } from "react";
import { api } from "@/services/api";
import {
  ProfileDiscoveryReport,
  DiscoveryProgressState,
} from "@/types/investigation";
import { ProfileDiscoveryLiveAnimation } from "@/components/discovery/ProfileDiscoveryLiveAnimation";
import { ProfileDiscoveryReportView } from "@/components/discovery/ProfileDiscoveryReportView";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  Search,
  Users2,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Radio,
  Building2,
  Layers,
  Code
} from "lucide-react";

const CASE2_PRESET_SUBJECTS = [
  {
    name: "Hareesh Rajendiran",
    alias: "",
    org: "Vanakkam DSA",
    domain: "DSA / Programming / Developer Education",
    context: "Public programming / DSA educator and contributor associated with Vanakkam DSA.",
    avatar: "/hareesh_reference.png",
    label: "Checkpoint 3 Demo: Hareesh Rajendiran (Vanakkam DSA)",
  },
  {
    name: "Sathana Jayaraman",
    alias: "Sathana0511",
    org: "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
    domain: "Computer Science & Engineering",
    context: "Engineering student & open source developer. GitHub: Sathana0511, Instagram: itz_sathana",
    avatar: "/sathana_reference.png",
    label: "Case 1 Comparison: Sathana Jayaraman",
  },
  {
    name: "Satya Nadella",
    alias: "satyanadella",
    org: "Microsoft",
    domain: "Cloud Computing & AI",
    context: "Executive Chairman and CEO of Microsoft; leading cloud and AI transformation.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    label: "Executive Benchmark: Satya Nadella (Microsoft)",
  },
];

export default function ProfileDiscoveryPage() {
  const [formData, setFormData] = useState({
    subjectName: "Hareesh Rajendiran",
    alias: "",
    organization: "Vanakkam DSA",
    domain: "DSA / Programming",
    additionalContext: "Public programming / DSA educator associated with Vanakkam DSA.",
  });
  const [selectedImage, setSelectedImage] = useState<string>("/hareesh_reference.png");
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryReport, setDiscoveryReport] = useState<ProfileDiscoveryReport | null>(null);
  const [progressState, setProgressState] = useState<DiscoveryProgressState>({
    discovery_id: "DISC-NEW",
    status: "IN_PROGRESS",
    current_stage: "INITIALIZING",
    progress_percent: 10,
    completed_stages: ["INITIALIZING"],
    queries_generated: 0,
    sources_searched: 0,
    profiles_discovered: 0,
    community_records: 0,
    project_records: 0,
    event_records: 0,
    verified_sources: 0,
  });

  const handleSelectPreset = (preset: typeof CASE2_PRESET_SUBJECTS[0]) => {
    setFormData({
      subjectName: preset.name,
      alias: preset.alias,
      organization: preset.org,
      domain: preset.domain,
      additionalContext: preset.context,
    });
    setSelectedImage(preset.avatar);
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  const handleStartDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subjectName.trim()) return;

    setIsDiscovering(true);
    setDiscoveryReport(null);
    setProgressState({
      discovery_id: "DISC-LIVE",
      status: "IN_PROGRESS",
      current_stage: "INITIALIZING",
      progress_percent: 15,
      completed_stages: ["INITIALIZING"],
      queries_generated: 4,
      sources_searched: 2,
      profiles_discovered: 0,
      community_records: 0,
      project_records: 0,
      event_records: 0,
      verified_sources: 0,
    });

    try {
      // 1. Kickoff backend discovery
      const discoveryResult = await api.discoverProfiles({
        subjectName: formData.subjectName,
        alias: formData.alias,
        organization: formData.organization,
        domain: formData.domain,
        additionalContext: formData.additionalContext,
        imageFile: selectedImage,
      });

      if (discoveryResult && discoveryResult.id) {
        const discId = discoveryResult.id;

        // 2. Poll backend for progress updates
        const stages = [
          { name: "READING PUBLIC CONTEXT", percent: 30 },
          { name: "GENERATING SEARCH QUERIES", percent: 45 },
          { name: "SEARCHING PUBLIC SOURCES", percent: 65 },
          { name: "DISCOVERING PROFILES", percent: 80 },
          { name: "VALIDATING SOURCES", percent: 92 },
          { name: "PREPARING DISCOVERY REPORT", percent: 100 },
        ];

        for (const stg of stages) {
          await new Promise((r) => setTimeout(r, 450));
          const liveStatus = await api.getDiscoveryStatus(discId);
          if (liveStatus) {
            setProgressState({
              ...liveStatus,
              current_stage: stg.name,
              progress_percent: stg.percent,
            });
          }
        }

        // 3. Set completed report
        const finalReport = await api.getDiscovery(discId);
        setDiscoveryReport(finalReport || discoveryResult);
      } else {
        setDiscoveryReport(discoveryResult);
      }
    } catch (err) {
      console.error("Discovery error:", err);
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 rounded-md">
              Checkpoint 3 — 5 Marks
            </span>
            <span className="text-xs font-mono text-slate-400">Case 2 Public Profile Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Public Profile Discovery Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover public profiles, repositories, and community records from an image + limited context without supplying URLs.
          </p>
        </div>
      </div>

      {/* Jury Presentation Explanatory Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-blue-800/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Checkpoint 3 — 5 Marks Evaluation Criteria
            </div>
            <p className="text-sm text-blue-100/90 leading-relaxed font-normal max-w-3xl">
              &ldquo;After generating candidate/context clues, TRACEID searches permitted public sources to discover relevant profiles and publicly available records associated with the investigation.&rdquo;
            </p>
          </div>
          <div className="shrink-0 bg-blue-800/60 border border-blue-400/40 px-4 py-2 rounded-xl text-center">
            <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Evaluation</div>
            <div className="text-base font-mono font-bold text-white">5 Marks</div>
          </div>
        </div>
      </div>

      {/* Live Fingerprint Investigation Animation when discovering */}
      {isDiscovering && (
        <ProfileDiscoveryLiveAnimation
          progress={progressState}
          subjectName={formData.subjectName}
        />
      )}

      {/* Discovery Results Report when complete */}
      {!isDiscovering && discoveryReport && (
        <ProfileDiscoveryReportView
          report={discoveryReport}
          onNewDiscovery={() => setDiscoveryReport(null)}
        />
      )}

      {/* Case 2 User Input Form when not discovering and no report */}
      {!isDiscovering && !discoveryReport && (
        <div className="space-y-6">
          {/* Quick Demo Subject Selector Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-blue-600" />
                Select Demo Case
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Consented Reference Images</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {CASE2_PRESET_SUBJECTS.map((preset) => {
                const isSelected = formData.subjectName === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <img
                      src={preset.avatar}
                      alt={preset.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{preset.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{preset.org}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Input Form */}
          <form onSubmit={handleStartDiscovery} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Reference Image Upload */}
              <div className="lg:col-span-4 space-y-4">
                <Card className="rounded-2xl border-slate-200 shadow-xs h-full flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-blue-600" />
                      Reference Image
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Consented portrait reference for visual feature anchor.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="relative aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center group hover:border-blue-400 transition-colors">
                      {selectedImage ? (
                        <>
                          <img
                            src={selectedImage}
                            alt="Reference"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white/90 hover:bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-sm">
                              Change Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCustomImageUpload}
                              />
                            </label>
                          </div>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center p-6 text-center w-full h-full">
                          <UploadCloud className="w-10 h-10 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                          <span className="text-xs font-bold text-slate-700">
                            Upload Consented Image
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1">
                            PNG, JPG or WEBP up to 10MB
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCustomImageUpload}
                          />
                        </label>
                      )}
                    </div>

                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-blue-800 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        Visual Signal Policy
                      </div>
                      <p className="text-[11px] text-blue-700 leading-normal">
                        The reference image is used as a supporting signal. TRACEID will dynamically discover public records without requiring URLs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Limited Public Context Form */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="rounded-2xl border-slate-200 shadow-xs">
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      CASE 2 — LIMITED PUBLIC CONTEXT
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Provide basic clues. TRACEID will autonomously generate search queries to discover public profiles.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-4">
                    {/* Known Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        KNOWN NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subjectName}
                        onChange={(e) =>
                          setFormData({ ...formData, subjectName: e.target.value })
                        }
                        placeholder="e.g. Hareesh Rajendiran"
                        className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                      />
                    </div>

                    {/* Username / Alias */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        USERNAME / ALIAS <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.alias}
                        onChange={(e) =>
                          setFormData({ ...formData, alias: e.target.value })
                        }
                        placeholder="e.g. hareesh_dsa (Leave blank to discover automatically)"
                        className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Organization / Community */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          ORGANIZATION / COMMUNITY
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({ ...formData, organization: e.target.value })
                          }
                          placeholder="e.g. Vanakkam DSA"
                          className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                        />
                      </div>

                      {/* Known Platform / Domain */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          KNOWN PLATFORM / DOMAIN
                        </label>
                        <input
                          type="text"
                          value={formData.domain}
                          onChange={(e) =>
                            setFormData({ ...formData, domain: e.target.value })
                          }
                          placeholder="e.g. DSA / Programming"
                          className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Additional Context */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        ADDITIONAL CONTEXT
                      </label>
                      <textarea
                        rows={3}
                        value={formData.additionalContext}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            additionalContext: e.target.value,
                          })
                        }
                        placeholder="e.g. Public programming / DSA educator associated with Vanakkam DSA."
                        className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs resize-none"
                      />
                    </div>

                    {/* Submit Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div className="text-[11px] text-slate-500">
                        Zero URL entry required • TRACEID will discover public records
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="gap-2 px-6 shadow-md shadow-blue-500/20 font-bold"
                      >
                        DISCOVER PUBLIC PROFILES <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Settings,
  Server,
  ShieldCheck,
  Cpu,
  Database,
  Sliders,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  const [backendMode, setBackendMode] = useState<"mock" | "fastapi">("mock");
  const [fastApiEndpoint, setFastApiEndpoint] = useState("http://localhost:8000/api/v1");
  const [ambiguityThreshold, setAmbiguityThreshold] = useState(75);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            System Configuration
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Settings & Backend Integration
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Configure identity resolution engine parameters, FastAPI service bridge, and TwinGuard sensitivity thresholds.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* API / Backend Connection */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-4.5 h-4.5 text-blue-600" />
                <span>Backend Engine Service Provider</span>
              </CardTitle>
              <CardDescription>
                Seamlessly toggle between autonomous offline mock datasets and live FastAPI backend endpoints.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  backendMode === "mock"
                    ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-100"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">Standalone Mock Engine (Active)</span>
                  <input
                    type="radio"
                    name="backend"
                    checked={backendMode === "mock"}
                    onChange={() => setBackendMode("mock")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-slate-600">
                  Fully operational standalone demo suite with realistic multi-signal benchmark personas.
                </p>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  backendMode === "fastapi"
                    ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-100"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">FastAPI REST Backend</span>
                  <input
                    type="radio"
                    name="backend"
                    checked={backendMode === "fastapi"}
                    onChange={() => setBackendMode("fastapi")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-slate-600">
                  Connect live Python FastAPI backend via <code className="font-mono text-[11px]">NEXT_PUBLIC_API_URL</code>.
                </p>
              </label>
            </div>

            {backendMode === "fastapi" && (
              <div className="pt-2 animate-in fade-in space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  FastAPI Endpoint URI
                </label>
                <input
                  type="text"
                  value={fastApiEndpoint}
                  onChange={(e) => setFastApiEndpoint(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Engine Guardrail Parameters */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-blue-600" />
                <span>TwinGuard & Resolution Guardrails</span>
              </CardTitle>
              <CardDescription>
                Tune multi-source corroboration thresholds and false-match prevention sensitivity.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  TwinGuard Ambiguity Threshold
                </span>
                <span className="font-mono font-bold text-blue-600">{ambiguityThreshold}% Correlation</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={ambiguityThreshold}
                onChange={(e) => setAmbiguityThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-500">
                Any candidate overlap exceeding this threshold without cryptographic confirmation triggers mandatory TwinGuard separation.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button type="submit" variant="primary" size="md" className="gap-1.5 shadow-sm">
            {saved ? <CheckCircle2 className="w-4 h-4 text-white" /> : null}
            {saved ? "Settings Saved" : "Save Preferences"}
          </Button>
        </div>
      </form>
    </div>
  );
}

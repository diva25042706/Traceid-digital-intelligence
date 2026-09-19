"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  FolderSearch,
  Users2,
  Database,
  GitFork,
  AlertTriangle,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Info,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [stats, setStats] = useState({
    activeInvestigations: 4,
    candidatesFound: 18,
    sourcesAnalyzed: 142,
    evidenceLinks: 384,
    ambiguitiesDetected: 7,
    verifiedRatePercent: 88.4,
    conflictsResolved: 12,
    humanReviewsPending: 2,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [invs, s] = await Promise.all([
          api.getRecentInvestigations(),
          api.getDashboardStats(),
        ]);
        setInvestigations(invs);
        setStats(s);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Investigation coverage data for Recharts
  const coverageData = [
    { category: "Professional", coverage: 92, count: 48, fill: "#2563EB" },
    { category: "Technical", coverage: 85, count: 64, fill: "#3B82F6" },
    { category: "Projects", coverage: 76, count: 32, fill: "#4F46E5" },
    { category: "Publications", coverage: 68, count: 28, fill: "#0891B2" },
    { category: "Events", coverage: 54, count: 18, fill: "#0D9488" },
    { category: "Social", coverage: 38, count: 12, fill: "#6366F1" },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Identity Intelligence Suite
            </span>
            <span className="text-xs text-slate-400 font-mono">v4.2 Enterprise</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            TRACEID AI
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Public Digital Footprint Intelligence & Identity Resolution
          </p>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            "Transform fragmented public information into explainable, evidence-backed identity intelligence."
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/profile-discovery">
            <Button variant="outline" size="md" className="text-xs font-bold gap-1.5 border-blue-300 bg-blue-50/50 text-blue-700 hover:bg-blue-100/60">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              CP-3: Profile Discovery (5 Marks)
            </Button>
          </Link>
          <Link href="/adversarial-lab">
            <Button variant="outline" size="md" className="text-xs">
              Adversarial Lab
            </Button>
          </Link>
          <Link href="/investigations/new">
            <Button variant="primary" size="md" className="gap-2 shadow-sm font-semibold">
              <PlusCircle className="w-4 h-4" />
              + New Investigation
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Active Investigations */}
        <Card className="p-4.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Investigations</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900">{stats.activeInvestigations}</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Across authorized dossiers</p>
          </div>
        </Card>

        {/* Candidates Found */}
        <Card className="p-4.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Candidates Found</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900">{stats.candidatesFound}</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Resolved entity clusters</p>
          </div>
        </Card>

        {/* Sources Analyzed */}
        <Card className="p-4.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Sources Analyzed</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900">{stats.sourcesAnalyzed}</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Autonomous public registries</p>
          </div>
        </Card>

        {/* Evidence Links */}
        <Card className="p-4.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Evidence Links</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GitFork className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900">{stats.evidenceLinks}</span>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Corroborated graph edges</p>
          </div>
        </Card>

        {/* Ambiguities Detected */}
        <Card className="p-4.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ambiguities Detected</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-amber-900">{stats.ambiguitiesDetected}</span>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">TwinGuard protected</p>
          </div>
        </Card>
      </div>

      {/* Intelligence Overview 4-Metric Strip */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Evidence Verified
            </span>
            <span className="text-base font-bold text-slate-900">{stats.verifiedRatePercent}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Conflicts Resolved
            </span>
            <span className="text-base font-bold text-slate-900">{stats.conflictsResolved} Cases</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Ambiguous Candidates
            </span>
            <span className="text-base font-bold text-slate-900">{stats.ambiguitiesDetected} Flagged</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Human Reviews Required
            </span>
            <span className="text-base font-bold text-slate-900">{stats.humanReviewsPending} Pending</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Investigations & Investigation Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Investigations Table (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Investigations</CardTitle>
                  <CardDescription>
                    Active and archived identity resolution dossiers
                  </CardDescription>
                </div>
                <Link
                  href="/investigations"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardHeader>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-5 py-3">Investigation</th>
                      <th className="px-3 py-3">Subject / Handle</th>
                      <th className="px-3 py-3">Sources</th>
                      <th className="px-3 py-3">Candidates</th>
                      <th className="px-5 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {investigations.map((inv) => (
                      <tr
                        key={inv.id}
                        className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      >
                        <td className="px-5 py-3.5 font-mono font-bold text-blue-600">
                          <Link href={`/investigations/${inv.id}`} className="hover:underline flex items-center gap-1.5">
                            {inv.id}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={inv.avatarUrl}
                              alt={inv.subjectName}
                              className="w-7 h-7 rounded-md object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{inv.subjectName}</p>
                              <p className="text-[11px] text-slate-500 font-mono">@{inv.alias}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 font-medium text-slate-700">
                          {inv.sourcesCount} Public Hubs
                        </td>
                        <td className="px-3 py-3.5 font-medium text-slate-700">
                          {inv.candidatesCount} Resolved
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <StatusBadge status={inv.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-xs text-slate-500">
              <span>Displaying {investigations.length} primary benchmark cases</span>
              <span className="font-mono">Deterministic Ground-Truth</span>
            </div>
          </Card>
        </div>

        {/* Investigation Coverage Recharts Visualization (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <div>
                <CardTitle>Investigation Coverage</CardTitle>
                <CardDescription>
                  Multi-domain footprint breadth across public repositories
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coverageData} layout="vertical" margin={{ left: 15, right: 15, top: 10, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} unit="%" />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
                      width={85}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val}% Coverage`, "Signal Depth"]}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="coverage" radius={[0, 4, 4, 0]}>
                      {coverageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Crucial Scientific Note from Prompt */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 text-xs text-blue-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Info className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>Methodological Notice:</span>
                </div>
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  <strong>Investigation Coverage</strong> indicates the breadth and density of available public evidence, not absolute proof of identity.
                </p>
              </div>
            </CardContent>

            <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-xs text-slate-500">
              <span>6 Corroborating Dimensions</span>
              <span className="font-semibold text-blue-600">Cross-Referenced</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

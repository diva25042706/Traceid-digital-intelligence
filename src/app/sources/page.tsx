"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { SourceItem } from "@/types/investigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Key,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await api.getSources();
      setSources(data);
    }
    load();
  }, []);

  const filtered = sources.filter((s) => {
    if (filterType === "Verified" && s.status !== "VERIFIED") return false;
    if (filterType === "Conflicting" && s.status !== "CONFLICTING") return false;
    if (filterType === "Low Reliability" && s.reliability !== "LOW") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.source.toLowerCase().includes(q) ||
        s.platform.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        s.endpointOrDomain.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Data Ingestion Ledger
            </span>
            <span className="text-xs text-slate-400 font-mono">100% Authorized Public Sources</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Source Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Public registries, code repositories, publication indices, and cryptographic key ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Key className="w-4 h-4 text-emerald-600" />
          <span><strong>8</strong> PGP / TLS Validated Endpoints</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search source by domain or platform..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "Verified", "Conflicting", "Low Reliability"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap",
                filterType === f
                  ? "bg-blue-600 text-white font-semibold shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Source & Platform</th>
                <th className="px-3 py-3.5">Category Type</th>
                <th className="px-3 py-3.5">Reliability</th>
                <th className="px-3 py-3.5">Last Checked</th>
                <th className="px-3 py-3.5">Evidence Count</th>
                <th className="px-5 py-3.5 text-right">Ingestion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{item.source}</p>
                      <p className="text-[11px] text-blue-600 font-mono flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-400" />
                        {item.endpointOrDomain}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded border",
                        item.reliability === "HIGH"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : item.reliability === "MEDIUM"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      )}
                    >
                      {item.reliability}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-slate-500 font-medium">
                    {item.lastChecked}
                  </td>
                  <td className="px-3 py-3.5 font-bold text-slate-800">
                    {item.evidenceCount} Claims
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border",
                        item.status === "VERIFIED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.status === "CONFLICTING"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      )}
                    >
                      {item.status === "VERIFIED" ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-xs text-slate-500">
          <span>Zero Private Credentials or Non-Public Databases Used</span>
          <span className="font-mono text-emerald-700 font-semibold">100% Audit-Trail Ready</span>
        </div>
      </Card>
    </div>
  );
}

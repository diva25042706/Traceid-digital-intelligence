"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  FolderSearch,
  PlusCircle,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Layers,
  Calendar,
  Building2,
  Globe,
} from "lucide-react";

export default function InvestigationsListPage() {
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await api.getRecentInvestigations();
      setInvestigations(data);
    }
    load();
  }, []);

  const filtered = investigations.filter((inv) => {
    if (filterStatus !== "ALL" && inv.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inv.subjectName.toLowerCase().includes(q) ||
        inv.alias.toLowerCase().includes(q) ||
        inv.organization.toLowerCase().includes(q) ||
        inv.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Dossier Registry
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Investigations
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Active and resolved public digital footprint investigations.
          </p>
        </div>

        <Link href="/investigations/new">
          <Button variant="primary" size="md" className="gap-2 shadow-xs">
            <PlusCircle className="w-4 h-4" />
            + New Investigation
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, handle, organization, or ID..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {["ALL", "ANALYSIS COMPLETE", "COMPLETED", "REVIEW REQUIRED", "INSUFFICIENT EVIDENCE"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterStatus === st
                  ? "bg-blue-600 text-white font-semibold shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Investigations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((inv) => (
          <Card key={inv.id} hoverEffect className="p-5 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  #{inv.id}
                </span>
                <StatusBadge status={inv.status} size="sm" />
              </div>

              <div className="flex items-start gap-3.5">
                <img
                  src={inv.avatarUrl}
                  alt={inv.subjectName}
                  className="w-13 h-13 rounded-xl object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-base truncate">{inv.subjectName}</h3>
                  <p className="text-xs font-mono text-blue-600">@{inv.alias}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {inv.organization}
                  </p>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">SOURCES</span>
                  <span className="font-bold text-slate-800">{inv.sourcesCount} Hubs</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">CANDIDATES</span>
                  <span className="font-bold text-slate-800">{inv.candidatesCount} Resolved</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">EVIDENCE</span>
                  <span className="font-bold text-emerald-700">{inv.evidenceLinksCount} Links</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Created: {new Date(inv.createdAt).toLocaleDateString()}
              </span>
              <Link href={`/investigations/${inv.id}`}>
                <Button variant="primary" size="sm" className="text-xs gap-1">
                  Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

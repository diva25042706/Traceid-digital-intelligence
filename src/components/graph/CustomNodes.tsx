"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  User,
  Building2,
  FolderGit2,
  Globe,
  FileText,
  Calendar,
  Key,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EvidenceNodeData } from "@/types/investigation";

const getIcon = (type: string, iconName?: string) => {
  switch (type) {
    case "person":
      return User;
    case "organization":
      return Building2;
    case "project":
      return FolderGit2;
    case "profile":
      return Globe;
    case "publication":
      return FileText;
    case "event":
      return Calendar;
    case "source":
      return Key;
    default:
      return HelpCircle;
  }
};

export const CustomEvidenceNode = memo(({ data, selected }: { data: EvidenceNodeData; selected: boolean }) => {
  const Icon = getIcon(data.type, data.icon);
  const status = data.status || "normal";

  const getStatusBorder = () => {
    if (selected) return "ring-2 ring-blue-600 border-blue-600 shadow-md";
    switch (status) {
      case "verified":
        return "border-emerald-300 hover:border-emerald-500";
      case "ambiguous":
        return "border-amber-300 hover:border-amber-500 bg-amber-50/20";
      case "conflicting":
        return "border-red-300 hover:border-red-500 bg-red-50/20";
      default:
        return "border-slate-200 hover:border-slate-400";
    }
  };

  const getTypeBadgeColor = () => {
    switch (data.type) {
      case "person":
        return "bg-blue-100 text-blue-800";
      case "organization":
        return "bg-purple-100 text-purple-800";
      case "project":
        return "bg-indigo-100 text-indigo-800";
      case "profile":
        return "bg-sky-100 text-sky-800";
      case "publication":
        return "bg-emerald-100 text-emerald-800";
      case "event":
        return "bg-orange-100 text-orange-800";
      case "source":
        return "bg-slate-200 text-slate-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl border p-3.5 shadow-xs min-w-[200px] max-w-[240px] transition-all cursor-pointer select-none",
        getStatusBorder()
      )}
    >
      {/* Top Handle */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-blue-600 border-2 !border-white" />

      <div className="flex items-start gap-3">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.label}
            className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className={cn("text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded", getTypeBadgeColor())}>
              {data.type}
            </span>
            {status === "verified" ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : status === "ambiguous" ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            ) : status === "conflicting" ? (
              <XCircle className="w-3.5 h-3.5 text-red-500" />
            ) : null}
          </div>

          <h5 className="font-bold text-xs text-slate-900 truncate">{data.label}</h5>
          {data.subtitle && (
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{data.subtitle}</p>
          )}
        </div>
      </div>

      {data.claimCount && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span>{data.claimCount} Claims Linked</span>
          <span className="font-mono text-blue-600 font-semibold">Inspect →</span>
        </div>
      )}

      {/* Bottom Handle */}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-blue-600 border-2 !border-white" />
    </div>
  );
});

CustomEvidenceNode.displayName = "CustomEvidenceNode";

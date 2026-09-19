import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Clock, ShieldCheck } from "lucide-react";

export type BadgeStatusType =
  | "HIGH CONFIDENCE"
  | "SUPPORTED"
  | "AMBIGUOUS"
  | "CONFLICTING"
  | "INSUFFICIENT EVIDENCE"
  | "UNDER REVIEW"
  | "ACTIVE"
  | "COMPLETED"
  | "REVIEW REQUIRED"
  | "ANALYSIS COMPLETE"
  | "VERIFIED";

interface StatusBadgeProps {
  status: BadgeStatusType | string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ status, size = "md", showIcon = true, className }: StatusBadgeProps) {
  const norm = status?.toUpperCase() || "";

  let bg = "bg-slate-100 text-slate-700 border-slate-200";
  let Icon = HelpCircle;

  if (norm === "HIGH CONFIDENCE" || norm === "VERIFIED" || norm === "COMPLETED" || norm === "ANALYSIS COMPLETE") {
    bg = "bg-emerald-50 text-emerald-700 border-emerald-200";
    Icon = ShieldCheck;
  } else if (norm === "SUPPORTED") {
    bg = "bg-blue-50 text-blue-700 border-blue-200";
    Icon = CheckCircle2;
  } else if (norm === "AMBIGUOUS" || norm === "REVIEW REQUIRED" || norm === "UNDER REVIEW") {
    bg = "bg-amber-50 text-amber-700 border-amber-200";
    Icon = AlertTriangle;
  } else if (norm === "CONFLICTING") {
    bg = "bg-red-50 text-red-700 border-red-200";
    Icon = XCircle;
  } else if (norm === "INSUFFICIENT EVIDENCE") {
    bg = "bg-slate-100 text-slate-600 border-slate-300";
    Icon = HelpCircle;
  } else if (norm === "ACTIVE") {
    bg = "bg-indigo-50 text-indigo-700 border-indigo-200";
    Icon = Clock;
  }

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-medium gap-1",
    md: "text-xs px-2.5 py-1 font-semibold gap-1.5",
    lg: "text-sm px-3 py-1.5 font-semibold gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border transition-colors shadow-xs select-none tracking-wide",
        sizeClasses[size],
        bg,
        className
      )}
    >
      {showIcon && <Icon className={cn(iconSizes[size], "shrink-0")} />}
      <span>{status}</span>
    </span>
  );
}

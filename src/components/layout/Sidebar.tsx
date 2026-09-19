"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  FolderSearch,
  Users2,
  GitFork,
  Clock8,
  Database,
  FileCheck2,
  FlaskConical,
  Settings,
  ShieldCheck,
  Fingerprint,
  Search,
  Network,
  SplitSquareVertical,
} from "lucide-react";

interface SidebarProps {
  onOpenResponsibleModal?: () => void;
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ onOpenResponsibleModal, className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "New Investigation", href: "/investigations/new", icon: PlusCircle, highlight: true },
    { label: "Profile Discovery", href: "/profile-discovery", icon: Search, badge: "Case 2" },
    { label: "Multi-Platform Correlation", href: "/multi-platform-correlation", icon: Network, badge: "Case 3" },
    { label: "Twin Identification", href: "/twin-identification", icon: SplitSquareVertical, badge: "TwinGuard", highlight: true },
    { label: "Investigations", href: "/investigations", icon: FolderSearch },
    { label: "Candidates", href: "/candidates", icon: Users2 },
    { label: "Evidence Graph", href: "/graph", icon: GitFork },
    { label: "Timeline", href: "/timeline", icon: Clock8 },
    { label: "Sources", href: "/sources", icon: Database },
    { label: "Reports", href: "/reports", icon: FileCheck2 },
    { label: "Adversarial Lab", href: "/adversarial-lab", icon: FlaskConical },
  ];

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30",
        className
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-blue-700 transition-colors">
              <Fingerprint className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base">TRACEID</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Identity Resolution
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Intelligence Platform
          </div>

          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-blue-50/80 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4.5 h-4.5 transition-colors shrink-0",
                      isActive
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {"badge" in item && item.badge && (
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Compliance & Settings */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <button
          onClick={onOpenResponsibleModal}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Responsible AI</span>
          </div>
          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
            PUBLIC
          </span>
        </button>

        <Link
          href="/settings"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          <Settings className="w-4.5 h-4.5 text-slate-400" />
          <span>Settings</span>
        </Link>

        {/* Engine status mini chip */}
        <div className="px-3 py-2 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-center justify-between">
          <span className="font-mono">Engine v4.2</span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Zero-Hallucination
          </span>
        </div>
      </div>
    </aside>
  );
}

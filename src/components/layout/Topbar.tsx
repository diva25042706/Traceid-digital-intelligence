"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TopbarProps {
  onToggleMobileMenu?: () => void;
  onOpenResponsibleModal?: () => void;
}

export function Topbar({ onToggleMobileMenu, onOpenResponsibleModal }: TopbarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // Construct dynamic breadcrumb
  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return [{ label: "Dashboard", href: "/" }];

    const breadcrumbs = [{ label: "Dashboard", href: "/" }];
    let currentPath = "";

    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part.startsWith("TRC-")) {
        label = `Investigation #${part}`;
      } else if (part === "investigations") {
        label = "Investigations";
      } else if (part === "new") {
        label = "New Investigation";
      } else if (part === "graph") {
        label = "Evidence Graph";
      } else if (part === "adversarial-lab") {
        label = "Adversarial Identity Lab";
      }
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Left Breadcrumb & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs md:text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-slate-900 truncate max-w-[200px] md:max-w-none">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-slate-500 hover:text-slate-900 transition-colors font-medium truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search identity / case #..."
            className="w-full h-8.5 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Responsible Compliance Pill */}
        <button
          onClick={onOpenResponsibleModal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          title="TRACEID AI Responsible Intelligence Verified"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-mono tracking-wider">CONSENTED • PUBLIC</span>
        </button>

        {/* Operational Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200 text-slate-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Systems Operational</span>
        </div>

        {/* Quick New Action */}
        <Link href="/investigations/new">
          <Button size="sm" variant="primary" className="hidden sm:inline-flex shadow-xs">
            + New
          </Button>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            className="w-8.5 h-8.5 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors relative"
            title="TwinGuard Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
          </button>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-100">
            AI
          </div>
          <div className="hidden xl:block text-left text-xs leading-tight">
            <p className="font-semibold text-slate-800">Lead Analyst</p>
            <p className="text-[10px] text-slate-400">CyberSec Intel</p>
          </div>
        </div>
      </div>
    </header>
  );
}

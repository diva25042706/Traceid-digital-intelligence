"use client";

import React from "react";
import { CorrelationMatrixRow, CorrelationMatrixCell } from "@/types/correlation";
import {
  Grid,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Minus,
  Info,
  ExternalLink
} from "lucide-react";

interface CorrelationMatrixTableProps {
  headers: string[];
  rows: CorrelationMatrixRow[];
  onSelectCell: (cell: CorrelationMatrixCell) => void;
}

export function CorrelationMatrixTable({
  headers,
  rows,
  onSelectCell,
}: CorrelationMatrixTableProps) {
  const getSymbolBadge = (cell: CorrelationMatrixCell) => {
    if (cell.status === "SELF") {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-400 font-bold text-sm">
          —
        </span>
      );
    }
    if (cell.status === "SUPPORTED") {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold text-sm border border-emerald-200 group-hover:scale-110 transition-transform">
          ✓
        </span>
      );
    }
    if (cell.status === "AMBIGUOUS") {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-extrabold text-sm border border-amber-200 group-hover:scale-110 transition-transform">
          ?
        </span>
      );
    }
    if (cell.status === "CONFLICTING") {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-50 text-rose-700 font-extrabold text-sm border border-rose-200 group-hover:scale-110 transition-transform">
          ⚠
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-50 text-slate-400 text-xs border border-slate-200">
        N/A
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Grid className="w-4 h-4 text-blue-600" />
            CORRELATION MATRIX
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pairwise multi-signal correlation matrix. Click any cell to inspect the cross-source verification ledger.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <span className="text-emerald-600 font-bold">✓</span> Supported
          </span>
          <span className="flex items-center gap-1">
            <span className="text-amber-600 font-bold">?</span> Ambiguous
          </span>
          <span className="flex items-center gap-1">
            <span className="text-rose-600 font-bold">⚠</span> Conflicting
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 rounded-tl-xl">
                Source Platform
              </th>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`p-3 text-xs font-bold text-slate-700 tracking-tight bg-slate-50 ${
                    i === headers.length - 1 ? "rounded-tr-xl" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {rows.map((row, rIdx) => (
              <tr key={row.platform_id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 text-left font-bold text-slate-900 bg-slate-50/50">
                  {row.platform}
                </td>
                {row.cells.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2">
                    <button
                      onClick={() => onSelectCell(cell)}
                      disabled={cell.status === "SELF"}
                      className={`group w-full py-1.5 px-2 rounded-xl flex items-center justify-center transition-all ${
                        cell.status === "SELF"
                          ? "cursor-default opacity-60"
                          : "hover:bg-blue-50/80 cursor-pointer"
                      }`}
                      title={
                        cell.status === "SELF"
                          ? "Self-identity"
                          : `Inspect correlation: ${cell.platform_from} ↔ ${cell.platform_to}`
                      }
                    >
                      {getSymbolBadge(cell)}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { PipelineStep, PipelineStepStatus } from "@/types/investigation";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Circle,
  ChevronRight,
  Info,
} from "lucide-react";

interface PipelineStepperProps {
  steps: PipelineStep[];
  currentStepIndex?: number;
  onSelectStep?: (step: PipelineStep) => void;
}

export function PipelineStepper({ steps, onSelectStep }: PipelineStepperProps) {
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(steps[5] || steps[0]);

  const getStatusStyles = (status: PipelineStepStatus) => {
    switch (status) {
      case "completed":
        return {
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-600 ring-4 ring-blue-100",
          line: "bg-blue-400",
          icon: CheckCircle2,
          iconColor: "text-blue-600",
        };
      case "current":
        return {
          badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
          dot: "bg-indigo-600 ring-4 ring-indigo-100 animate-pulse",
          line: "bg-slate-200",
          icon: Loader2,
          iconColor: "text-indigo-600 animate-spin",
        };
      case "warning":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500 ring-4 ring-amber-100",
          line: "bg-amber-300",
          icon: AlertTriangle,
          iconColor: "text-amber-500",
        };
      case "conflict":
        return {
          badge: "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500 ring-4 ring-red-100",
          line: "bg-red-300",
          icon: XCircle,
          iconColor: "text-red-500",
        };
      case "pending":
      default:
        return {
          badge: "bg-slate-50 text-slate-400 border-slate-200",
          dot: "bg-slate-300 ring-2 ring-slate-100",
          line: "bg-slate-200",
          icon: Circle,
          iconColor: "text-slate-300",
        };
    }
  };

  const handleStepClick = (step: PipelineStep) => {
    setSelectedStep(step);
    if (onSelectStep) onSelectStep(step);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Explainable Pipeline
            </span>
            <span className="text-xs text-slate-400 font-mono">9-Stage Deterministic Flow</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">TRACEID Resolution Pipeline</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Completed</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Ambiguity Check</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Pending</span>
        </div>
      </div>

      {/* Pipeline Stepper Horizontal Flow */}
      <div className="relative overflow-x-auto pb-3 pt-2">
        <div className="flex items-center min-w-[780px] justify-between relative px-2">
          {steps.map((step, idx) => {
            const styles = getStatusStyles(step.status);
            const isSelected = selectedStep.id === step.id;
            const Icon = styles.icon;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Step Node Button */}
                <button
                  onClick={() => handleStepClick(step)}
                  className={cn(
                    "flex flex-col items-center group relative cursor-pointer focus:outline-none transition-all",
                    isSelected && "scale-105"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white border",
                      isSelected ? "border-blue-600 shadow-md ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", styles.iconColor)} />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold mt-1.5 uppercase tracking-wider transition-colors text-center whitespace-nowrap",
                      isSelected ? "text-blue-700 font-extrabold" : "text-slate-600 group-hover:text-slate-900"
                    )}
                  >
                    {step.shortName}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {step.timestamp || `0${idx + 1}`}
                  </span>
                </button>

                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-2 h-0.5 relative">
                    <div
                      className={cn(
                        "h-full rounded-full transition-colors",
                        styles.line
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Mini Detail Inspector */}
      {selectedStep && (
        <div className="mt-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start justify-between gap-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-900">
                Stage {selectedStep.shortName}: {selectedStep.name}
              </span>
              <p className="text-slate-600 mt-0.5 leading-relaxed">
                {selectedStep.description}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 border",
              selectedStep.status === "warning"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : selectedStep.status === "conflict"
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-blue-50 text-blue-800 border-blue-200"
            )}
          >
            {selectedStep.status}
          </span>
        </div>
      )}
    </div>
  );
}

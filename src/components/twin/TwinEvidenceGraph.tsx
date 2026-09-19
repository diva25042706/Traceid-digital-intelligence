"use client";

import React, { useState } from "react";
import { TwinEvidenceGraphNode, TwinEvidenceGraphEdge } from "@/types/twin";
import {
  Network,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";

interface TwinEvidenceGraphProps {
  nodes: TwinEvidenceGraphNode[];
  edges: TwinEvidenceGraphEdge[];
  onSelectEdge?: (edge: TwinEvidenceGraphEdge) => void;
  onSelectNode?: (node: TwinEvidenceGraphNode) => void;
}

export function TwinEvidenceGraph({
  nodes,
  edges,
  onSelectEdge,
  onSelectNode,
}: TwinEvidenceGraphProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Position coordinates map for clean 2D comparison graph layout
  const nodePositions: Record<string, { x: number; y: number }> = {
    "node-person-a": { x: 160, y: 150 },
    "node-engine": { x: 400, y: 220 },
    "node-person-b": { x: 640, y: 150 },
    "node-sig-visual": { x: 220, y: 360 },
    "node-sig-name": { x: 340, y: 380 },
    "node-sig-org": { x: 460, y: 380 },
    "node-sig-domain": { x: 580, y: 360 },
    "node-sig-timeline": { x: 400, y: 70 },
  };

  const getCoordinates = (nodeId: string, index: number, total: number) => {
    if (nodePositions[nodeId]) {
      return nodePositions[nodeId];
    }
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: 400 + 200 * Math.cos(angle),
      y: 220 + 140 * Math.sin(angle),
    };
  };

  const getEdgeStroke = (status: string, isHovered: boolean) => {
    if (isHovered) return "#a855f7";
    if (status === "SUPPORTS" || status === "CONSISTENT") return "#10b981";
    if (status === "CONTRADICTS") return "#ef4444";
    if (status === "UNKNOWN") return "#f59e0b";
    return "#94a3b8";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-400" />
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Twin Evidence Comparison Graph
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
              Multi-Signal Fusion
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual topology comparing Person A and Person B across independent evidence channels.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-slate-300">Supports / Consistent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="text-slate-300">Contradicts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-300">Ambiguous</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full overflow-x-auto mt-4 py-2 flex justify-center">
        <svg
          viewBox="0 0 800 460"
          className="w-full max-w-[800px] h-[460px] select-none"
        >
          {/* Render Edges */}
          {edges.map((edge) => {
            const srcIdx = nodes.findIndex((n) => n.id === edge.source);
            const tgtIdx = nodes.findIndex((n) => n.id === edge.target);
            const srcPos = getCoordinates(edge.source, srcIdx, nodes.length);
            const tgtPos = getCoordinates(edge.target, tgtIdx, nodes.length);

            const isHovered = hoveredEdgeId === edge.id;
            const strokeColor = getEdgeStroke(edge.status, isHovered);
            const strokeWidth = isHovered ? 3.5 : 2;

            const midX = (srcPos.x + tgtPos.x) / 2;
            const midY = (srcPos.y + tgtPos.y) / 2;

            return (
              <g
                key={edge.id}
                className="cursor-pointer group"
                onClick={() => onSelectEdge && onSelectEdge(edge)}
                onMouseEnter={() => setHoveredEdgeId(edge.id)}
                onMouseLeave={() => setHoveredEdgeId(null)}
              >
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={edge.status === "UNKNOWN" ? "4 4" : undefined}
                  className="transition-all duration-200"
                />

                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke="transparent"
                  strokeWidth={14}
                />

                {/* Edge Label Badge */}
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x={-(edge.label.length * 3.3 + 8)}
                    y={-9}
                    width={edge.label.length * 6.6 + 16}
                    height={18}
                    rx={9}
                    className={`transition-all ${
                      isHovered
                        ? "fill-purple-600 stroke-white"
                        : "fill-slate-950 stroke-slate-700 hover:stroke-purple-400"
                    }`}
                    strokeWidth={1}
                  />
                  <text
                    x={0}
                    y={3}
                    textAnchor="middle"
                    className="text-[8.5px] font-mono font-bold fill-slate-200 pointer-events-none"
                  >
                    {edge.label}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node, index) => {
            const pos = getCoordinates(node.id, index, nodes.length);
            const isSubjectA = node.type === "SUBJECT_A";
            const isSubjectB = node.type === "SUBJECT_B";
            const isEngine = node.type === "ENGINE";
            const isHovered = hoveredNodeId === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer group"
                onClick={() => onSelectNode && onSelectNode(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {isEngine ? (
                  // Central TwinGuard Engine
                  <>
                    <circle
                      r={isHovered ? 42 : 38}
                      className="fill-purple-700 transition-all duration-200"
                      stroke="#c084fc"
                      strokeWidth={isHovered ? 3 : 2}
                    />
                    <circle
                      r={isHovered ? 46 : 42}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth={1}
                      className="animate-ping duration-1000 opacity-30"
                    />
                    <text
                      y={-4}
                      textAnchor="middle"
                      className="text-[10px] font-extrabold fill-white"
                    >
                      TwinGuard
                    </text>
                    <text
                      y={10}
                      textAnchor="middle"
                      className="text-[8px] font-mono fill-purple-200"
                    >
                      COMPARATOR
                    </text>
                  </>
                ) : isSubjectA || isSubjectB ? (
                  // Subject Cards
                  <>
                    <rect
                      x={-60}
                      y={-24}
                      width={120}
                      height={48}
                      rx={14}
                      className={`transition-all duration-200 ${
                        isSubjectA
                          ? isHovered
                            ? "fill-blue-700 stroke-blue-400"
                            : "fill-slate-950 stroke-blue-500/60"
                          : isHovered
                          ? "fill-indigo-700 stroke-indigo-400"
                          : "fill-slate-950 stroke-indigo-500/60"
                      }`}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                    />
                    <text
                      y={-4}
                      textAnchor="middle"
                      className="text-[11px] font-extrabold fill-white"
                    >
                      {node.label}
                    </text>
                    <text
                      y={12}
                      textAnchor="middle"
                      className="text-[8.5px] font-mono fill-slate-400 truncate max-w-[100px]"
                    >
                      {node.subtitle || (isSubjectA ? "PERSON A" : "PERSON B")}
                    </text>
                  </>
                ) : (
                  // Signal Nodes
                  <>
                    <rect
                      x={-50}
                      y={-18}
                      width={100}
                      height={36}
                      rx={10}
                      className={`transition-all duration-200 ${
                        isHovered
                          ? "fill-slate-800 stroke-purple-400"
                          : "fill-slate-950 stroke-slate-700"
                      }`}
                      strokeWidth={isHovered ? 2 : 1}
                    />
                    <text
                      y={-3}
                      textAnchor="middle"
                      className="text-[9.5px] font-bold fill-slate-200"
                    >
                      {node.label}
                    </text>
                    <text
                      y={10}
                      textAnchor="middle"
                      className="text-[7.5px] font-mono fill-slate-400"
                    >
                      {node.subtitle}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-purple-400" />
          Click any edge or signal node to inspect the underlying multi-source comparison evidence.
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          Independent Evidence Fusion
        </span>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomEvidenceNode } from "./CustomNodes";
import { EvidenceDetailPanel } from "./EvidenceDetailPanel";
import { EvidenceNodeData, EvidenceEdgeData, EvidenceDetail } from "@/types/investigation";
import { api } from "@/services/api";
import {
  Search,
  Filter,
  Eye,
  EyeOff,
  AlertTriangle,
  ShieldCheck,
  Maximize2,
  RefreshCw,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const nodeTypes = {
  custom: CustomEvidenceNode,
};

interface EvidenceGraphCanvasProps {
  initialNodes?: EvidenceNodeData[];
  initialEdges?: EvidenceEdgeData[];
  investigationId?: string;
}

export function EvidenceGraphCanvas({
  initialNodes = [],
  initialEdges = [],
  investigationId = "TRC-001",
}: EvidenceGraphCanvasProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [showSources, setShowSources] = useState(true);
  const [showConflictsOnly, setShowConflictsOnly] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceDetail | null>(null);

  // Layout default positions in structured circular/layered topology
  const defaultNodes: Node[] = useMemo(() => {
    const total = initialNodes.length || 1;
    return initialNodes.map((n, idx) => {
      let x = 350;
      let y = 250;

      if (n.type === "person" && n.id.includes("subject")) {
        x = 350;
        y = 200;
      } else if (n.type === "organization") {
        x = 100 + (idx % 3) * 220;
        y = 40;
      } else if (n.type === "project") {
        x = 80 + (idx % 2) * 300;
        y = 380;
      } else if (n.type === "profile") {
        x = 580;
        y = 120 + (idx % 3) * 110;
      } else if (n.type === "publication" || n.type === "event") {
        x = 100;
        y = 200 + (idx % 2) * 120;
      } else if (n.type === "source") {
        x = 750;
        y = 220 + (idx % 2) * 100;
      } else {
        // Disambiguated / Homonym node
        x = 420;
        y = 520;
      }

      return {
        id: n.id,
        type: "custom",
        position: { x, y },
        data: n,
      };
    });
  }, [initialNodes]);

  const defaultEdges: Edge[] = useMemo(() => {
    return initialEdges.map((e) => {
      let stroke = "#3b82f6"; // default blue
      let markerColor = "#3b82f6";

      if (e.status === "verified") {
        stroke = "#059669"; // emerald
        markerColor = "#059669";
      } else if (e.status === "ambiguous") {
        stroke = "#d97706"; // amber
        markerColor = "#d97706";
      } else if (e.status === "conflicting") {
        stroke = "#dc2626"; // red
        markerColor = "#dc2626";
      }

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: e.status === "verified" || e.status === "ambiguous",
        style: { stroke, strokeWidth: 2 },
        labelStyle: { fill: "#475569", fontWeight: 600, fontSize: 10 },
        labelBgStyle: { fill: "#ffffff", fillOpacity: 0.95, stroke: "#e2e8f0", rx: 4, ry: 4 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: markerColor,
        },
      };
    });
  }, [initialEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  // Filter nodes based on UI controls
  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      const data = node.data as unknown as EvidenceNodeData;
      if (!showSources && data.type === "source") return false;
      if (showConflictsOnly && data.status !== "conflicting" && data.status !== "ambiguous") return false;
      if (selectedTypeFilter !== "all" && data.type !== selectedTypeFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const label = data.label.toLowerCase();
        const sub = (data.subtitle || "").toLowerCase();
        return label.includes(query) || sub.includes(query);
      }
      return true;
    });
  }, [nodes, showSources, showConflictsOnly, selectedTypeFilter, searchQuery]);

  const onNodeClick = useCallback(async (_: any, node: Node) => {
    const detail = await api.getEvidenceDetail(node.id);
    setSelectedEvidence(detail);
  }, []);

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden flex shadow-xs">
      {/* Top Filter & Control Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
        {/* Search & Type filter (Left) */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph nodes..."
              className="w-full h-8 pl-8 pr-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="h-8 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Node Types</option>
            <option value="person">Person</option>
            <option value="organization">Organization</option>
            <option value="project">Project</option>
            <option value="profile">Profile</option>
            <option value="publication">Publication</option>
            <option value="event">Event</option>
            <option value="source">Cryptographic / Source</option>
          </select>
        </div>

        {/* Toggles (Right) */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
          <button
            onClick={() => setShowSources((prev) => !prev)}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer",
              showSources ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {showSources ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Sources</span>
          </button>

          <button
            onClick={() => setShowConflictsOnly((prev) => !prev)}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer",
              showConflictsOnly
                ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Show Conflicts</span>
          </button>
        </div>
      </div>

      {/* Legend Badge Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-sm text-[11px] space-y-1.5 hidden sm:block">
        <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-1">
          Relationship Legend
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Verified Link
          </span>
          <span className="flex items-center gap-1 text-blue-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Attributed
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Ambiguous
          </span>
          <span className="flex items-center gap-1 text-red-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Conflicting
          </span>
        </div>
      </div>

      {/* Main React Flow Canvas */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          className="bg-[#F8FAFC]"
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls position="bottom-right" className="!bg-white !border !border-slate-200 !shadow-sm !rounded-xl" />
          <MiniMap
            nodeColor={(node: any) => {
              const data = node.data as EvidenceNodeData;
              if (data.status === "verified") return "#059669";
              if (data.status === "ambiguous") return "#d97706";
              if (data.status === "conflicting") return "#dc2626";
              return "#2563eb";
            }}
            className="!border !border-slate-200 !rounded-xl !overflow-hidden !shadow-sm"
          />
        </ReactFlow>
      </div>

      {/* Evidence Detail Right Side Panel */}
      <EvidenceDetailPanel evidence={selectedEvidence} onClose={() => setSelectedEvidence(null)} />
    </div>
  );
}

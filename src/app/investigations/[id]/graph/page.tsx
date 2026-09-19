"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/api";
import { Investigation } from "@/types/investigation";
import { EvidenceGraphCanvas } from "@/components/graph/EvidenceGraphCanvas";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, GitFork } from "lucide-react";

export default function CaseGraphPage() {
  const params = useParams();
  const id = (params?.id as string) || "TRC-001";
  const [investigation, setInvestigation] = useState<Investigation | null>(null);

  useEffect(() => {
    async function load() {
      const data = await api.getInvestigation(id);
      setInvestigation(data);
    }
    load();
  }, [id]);

  if (!investigation) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link href={`/investigations/${id}`}>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Workspace
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Evidence Graph: {investigation.subjectName} (#{investigation.id})
            </h1>
            <p className="text-xs text-slate-500">
              Click any node to open the Evidence Details panel on the right.
            </p>
          </div>
        </div>
      </div>

      <EvidenceGraphCanvas
        initialNodes={investigation.nodes}
        initialEdges={investigation.edges}
        investigationId={investigation.id}
      />
    </div>
  );
}

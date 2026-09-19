"use client";

import React, { useState } from "react";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ResponsibleModal } from "@/components/modals/ResponsibleModal";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isResponsibleModalOpen, setIsResponsibleModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>TRACEID AI — Explainable Public Digital Footprint Intelligence</title>
        <meta
          name="description"
          content="Explainable Public Digital Footprint Intelligence & Identity Resolution platform."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        <div className="flex flex-1 min-h-screen">
          {/* Desktop Left Persistent Sidebar */}
          <div className="hidden md:block">
            <Sidebar
              onOpenResponsibleModal={() => setIsResponsibleModalOpen(true)}
            />
          </div>

          {/* Mobile Drawer Sidebar */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
              <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="relative z-10">
                <Sidebar
                  onOpenResponsibleModal={() => {
                    setIsMobileMenuOpen(false);
                    setIsResponsibleModalOpen(true);
                  }}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main Content Workspace Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
            <Topbar
              onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
              onOpenResponsibleModal={() => setIsResponsibleModalOpen(true)}
            />

            <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
              {children}
            </main>
          </div>
        </div>

        {/* Global Responsible Intelligence Modal */}
        <ResponsibleModal
          isOpen={isResponsibleModalOpen}
          onClose={() => setIsResponsibleModalOpen(false)}
        />
      </body>
    </html>
  );
}

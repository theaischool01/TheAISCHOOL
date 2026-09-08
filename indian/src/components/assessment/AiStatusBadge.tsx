"use client";

import React from 'react';
import { Sparkles, AlertTriangle, Loader2 } from 'lucide-react';

interface AiStatusBadgeProps {
  isLive?: boolean | null;
  isLoading?: boolean;
  fallbackReason?: string;
  className?: string;
}

export default function AiStatusBadge({
  isLive,
  isLoading,
  fallbackReason,
  className = ''
}: AiStatusBadgeProps) {
  if (isLoading) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-semibold tracking-wide ${className}`}
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
        <span>Generating with Groq AI...</span>
      </div>
    );
  }

  if (isLive === true) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-semibold tracking-wide shadow-xs ${className}`}
        title="Generated using real-time Groq API completions"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <Sparkles className="w-3 h-3 text-emerald-600" />
        <span>Live AI (Groq Verified)</span>
      </div>
    );
  }

  if (isLive === false) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-semibold tracking-wide shadow-xs ${className}`}
        title={fallbackReason ? `Offline fallback triggered: ${fallbackReason}` : 'Offline fallback active'}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>
          Offline Fallback
          {fallbackReason ? ` (${fallbackReason})` : ''}
        </span>
      </div>
    );
  }

  return null;
}

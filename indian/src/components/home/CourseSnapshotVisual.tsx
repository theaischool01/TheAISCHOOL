"use client";

import React from "react";

export default function CourseSnapshotVisual() {
  return (
    <svg 
      width="100%" 
      height="100%"
      viewBox="0 0 680 650" 
      role="img" 
      aria-label="Isometric block illustration"
      className="w-full h-full object-contain"
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#EE1C25" stopOpacity={0.08} />
          <stop offset="100%" stopColor="#EE1C25" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="680" height="650" fill="url(#bgGlow)" />
      <circle cx="380" cy="380" r="270" fill="none" stroke="#000000" strokeOpacity={0.06} strokeWidth="1" />
      <circle cx="380" cy="380" r="270" strokeDasharray="1 7" fill="none" stroke="#EE1C25" strokeOpacity={0.35} strokeWidth="1.5" />
      <circle cx="120" cy="120" r="3" fill="#EE1C25" opacity="0.5" />
      <circle cx="150" cy="160" r="2" fill="#000000" opacity="0.25" />
      <circle cx="100" cy="200" r="2.5" fill="#EE1C25" opacity="0.3" />
      <circle cx="600" cy="150" r="3" fill="#000000" opacity="0.2" />
      <circle cx="570" cy="200" r="2" fill="#EE1C25" opacity="0.4" />
      <ellipse cx="370" cy="610" rx="230" ry="26" fill="#000000" opacity="0.06" />
      <polygon points="240,460 280,480 240,500 200,480" fill="#ffffff" stroke="#00000014" strokeWidth="0.5" />
      <polygon points="200,480 240,500 240,570 200,550" fill="#f1f1f1" stroke="#00000014" strokeWidth="0.5" />
      <polygon points="240,500 280,480 280,550 240,570" fill="#dcdcdc" stroke="#00000014" strokeWidth="0.5" />
      <polygon points="330,410 370,430 330,450 290,430" fill="#4a4a4a" stroke="#00000030" strokeWidth="0.5" />
      <polygon points="290,430 330,450 330,580 290,560" fill="#2b2b2b" stroke="#00000030" strokeWidth="0.5" />
      <polygon points="330,450 370,430 370,560 330,580" fill="#171717" stroke="#00000030" strokeWidth="0.5" />
      <polygon points="430,360 470,380 430,400 390,380" fill="#ff6b64" stroke="#00000020" strokeWidth="0.5" />
      <polygon points="390,380 430,400 430,590 390,570" fill="#EE1C25" stroke="#00000020" strokeWidth="0.5" />
      <polygon points="430,400 470,380 470,570 430,590" fill="#b8141a" stroke="#00000020" strokeWidth="0.5" />
      <polygon points="500,420 540,440 500,460 460,440" fill="#ffffff" stroke="#00000014" strokeWidth="0.5" />
      <polygon points="460,440 500,460 500,515 460,495" fill="#f1f1f1" stroke="#00000014" strokeWidth="0.5" />
      <polygon points="500,460 540,440 540,495 500,515" fill="#dcdcdc" stroke="#00000014" strokeWidth="0.5" />
      <line x1="430" y1="360" x2="430" y2="255" stroke="#EE1C25" strokeOpacity={0.3} strokeWidth="1.5" strokeDasharray="4 5" />
      <ellipse cx="430" cy="290" rx="66" ry="20" fill="none" stroke="#EE1C25" strokeOpacity={0.45} strokeWidth="1.5" />
      <circle cx="430" cy="235" r="22" fill="#EE1C25" />
      <circle cx="422" cy="227" r="6" fill="#ffffff" opacity="0.55" />
      <circle cx="360" cy="290" r="4" fill="#171717" opacity="0.5" />
      <circle cx="500" cy="270" r="3" fill="#EE1C25" opacity="0.5" />
    </svg>
  );
}

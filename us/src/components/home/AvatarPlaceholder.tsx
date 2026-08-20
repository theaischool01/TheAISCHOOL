"use client";

import React from "react";
import { User } from "lucide-react";

interface AvatarPlaceholderProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  imageUrl?: string;
  theme?: "dark" | "light";
}

export default function AvatarPlaceholder({
  name,
  className = "",
  size = "md",
  imageUrl,
  theme = "dark",
}: AvatarPlaceholderProps) {
  const [imageError, setImageError] = React.useState(false);

  // Compute initials from name
  const initials = React.useMemo(() => {
    if (!name || name.trim().length === 0) return "AI";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-20 h-20 text-base",
    lg: "w-24 h-24 text-xl",
    xl: "w-32 h-32 text-2xl",
  }[size];

  if (imageUrl && !imageError) {
    const borderClass =
      theme === "light"
        ? "border-2 border-red-100 shadow-sm"
        : "border-2 border-[#C1121C]/40";

    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 ${borderClass} ${sizeClasses} ${className}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover object-top"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  if (theme === "light") {
    return (
      <div
        className={`relative rounded-full shrink-0 flex flex-col items-center justify-center bg-red-50 border-2 border-dashed border-red-200/90 text-[#C1121C] shadow-sm group-hover:border-[#C1121C] group-hover:bg-red-100/60 transition-all duration-300 ${sizeClasses} ${className}`}
        title={name}
      >
        <span className="font-black tracking-wider text-[#C1121C] transition-colors select-none">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-full shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-2 border-dashed border-[#C1121C]/50 text-white shadow-inner group hover:border-[#C1121C] transition-all duration-300 ${sizeClasses} ${className}`}
      title={name}
    >
      <div className="absolute inset-0 rounded-full bg-[#C1121C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <User className="w-1/3 h-1/3 text-neutral-500 group-hover:text-[#C1121C] transition-colors mb-0.5" />
      <span className="font-extrabold tracking-wider text-neutral-200 group-hover:text-white transition-colors">
        {initials}
      </span>
    </div>
  );
}

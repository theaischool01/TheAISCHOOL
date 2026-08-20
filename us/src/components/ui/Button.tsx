import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer";

  const variantStyles = {
    primary:
      "bg-[#EE1C25] hover:bg-[#D3131B] text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/35",
    secondary:
      "bg-slate-900 hover:bg-slate-800 text-white shadow-md",
    outline:
      "border-2 border-slate-200 hover:border-slate-300 text-slate-800 bg-white/50 backdrop-blur-sm",
    ghost:
      "text-slate-700 hover:bg-slate-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

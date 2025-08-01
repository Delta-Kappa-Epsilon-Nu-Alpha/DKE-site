"use client";

import { ArrowRightIcon } from "lucide-react";

interface RedirectButtonProps {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderWidth?: string;
  className?: string;
  glassEffect?: boolean;
}

export default function RedirectButton({
  href,
  children,
  arrow = true,
  borderColor = "black",
  textColor = "black",
  backgroundColor = "transparent",
  borderWidth = "1px",
  className = "",
  glassEffect = false,
}: RedirectButtonProps) {
  return (
    <div className="tablet:m-10 flex justify-between items-center mb-6">
      <a
        href={href}
        className={`px-6 py-3 border rounded-3xl hover:scale-105 transition-all ease-out duration-300 link flex items-center gap-1 group text-xl font-medium ${
          glassEffect
            ? "bg-black/40 backdrop-blur-md border-white/20 shadow-2xl"
            : ""
        } ${className}`}
        style={{
          borderColor: glassEffect ? undefined : borderColor,
          color: textColor,
          backgroundColor: glassEffect ? undefined : backgroundColor,
          borderWidth: glassEffect ? undefined : borderWidth,
          fontFamily: "'Arial', 'Helvetica', sans-serif",
        }}
      >
        {children}
        {arrow && (
          <ArrowRightIcon
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
            style={{ color: textColor }}
          />
        )}
      </a>
    </div>
  );
}

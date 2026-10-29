import type { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  showText?: boolean;
}

export default function Logo({
  size = 32,
  showText = true,
  className = "",
  ...props
}: LogoProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width="40" height="40" rx="10" fill="#D4621A" />
        <circle cx="14" cy="26" r="4" fill="#FFFFFF" />
        <circle cx="26" cy="14" r="4" fill="#FFFFFF" />
        <circle cx="26" cy="26" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        <path
          d="M14 26L26 14M14 26L26 26"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className="text-lg font-extrabold tracking-tight text-foreground font-sans">
          Talent<span className="text-primary">Graph</span>
        </span>
      )}
    </div>
  );
}

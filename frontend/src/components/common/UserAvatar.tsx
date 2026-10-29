import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  name,
  imageUrl,
  size = "md",
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "size-7 text-[10px]",
    md: "size-8.5 text-xs",
    lg: "size-11 text-sm",
  };

  const getInitials = (n?: string) => {
    if (!n) return "TG";
    const parts = n.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  if (imageUrl) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full border border-border shrink-0 bg-secondary",
          sizeClasses[size],
          className,
        )}
      >
        <Image
          src={imageUrl}
          alt={name || "User Avatar"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold uppercase tracking-wider shrink-0 bg-primary/10 text-primary border border-primary/20",
        sizeClasses[size],
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}

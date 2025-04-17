"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  href,
  label = "Back",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (href) {
    return (
      <Button
        variant="ghost"
        size="sm"
        asChild
        className={`group hover:bg-gray-800/50 ${className}`}
      >
        <Link href={href} className="flex items-center gap-2">
          <ChevronLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span>{label}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`group hover:bg-gray-800/50 ${className}`}
    >
      <ChevronLeft
        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
        aria-hidden="true"
      />
      <span>{label}</span>
    </Button>
  );
}

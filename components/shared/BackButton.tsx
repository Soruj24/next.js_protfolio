"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackUrl?: string;
  children?: React.ReactNode;
}

export default function BackButton({ fallbackUrl = "/", children }: BackButtonProps) {
  return (
    <Link
      href={fallbackUrl}
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
    >
      {children || <ArrowLeft className="w-4 h-4" />}
      <span>Back</span>
    </Link>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="flex items-center gap-1 cursor-pointer group">
      {" "} 
      <ChevronLeft className="transition-all duration-400 group-hover:-translate-x-0.5" /> Back
    </Button>
  );
}

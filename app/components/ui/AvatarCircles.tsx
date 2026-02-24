"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarCirclesProps {
  numPeople?: number;
  avatarUrls: string[];
  className?: string;
}

export function AvatarCircles({
  numPeople,
  avatarUrls,
  className,
}: AvatarCirclesProps) {
  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {avatarUrls.map((url, index) => (
        <div
          key={index}
          className="relative h-9 w-9 rounded-full border-2 border-white shadow-sm overflow-hidden"
          style={{ zIndex: avatarUrls.length - index }}
        >
          <Image
            src={url}
            alt={`Avatar ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
      {numPeople !== undefined && numPeople > 0 && (
        <div
          className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#FF4D29] text-xs font-semibold text-white shadow-sm"
          style={{ zIndex: 0 }}
        >
          +{numPeople}
        </div>
      )}
    </div>
  );
}

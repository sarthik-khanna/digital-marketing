"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Recharts is ~100 kB; it loads after the page instead of in the main bundle.
const TrafficChart = dynamic(() => import("./traffic-chart"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full rounded-2xl sm:h-72" />,
});

export function TrafficChartLazy() {
  return <TrafficChart />;
}

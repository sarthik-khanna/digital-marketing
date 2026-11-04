"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { seoExtras } from "@/lib/services";

const config = {
  sessions: { label: "Organic sessions (sample)", color: "var(--primary)" },
} satisfies ChartConfig;

/** Recharts area chart; loaded on the client only via traffic-chart-lazy.tsx. */
export default function TrafficChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full sm:h-72">
      <AreaChart data={seoExtras.trafficSample} margin={{ left: 0, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="seo-sessions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-sessions)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-sessions)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval="preserveStartEnd"
          tickFormatter={(value: string) => value.replace("Month ", "M")}
        />
        <YAxis tickLine={false} axisLine={false} width={40} tickFormatter={(v: number) => `${v / 1000}k`} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="sessions"
          type="monotone"
          fill="url(#seo-sessions)"
          stroke="var(--color-sessions)"
          strokeWidth={2.5}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

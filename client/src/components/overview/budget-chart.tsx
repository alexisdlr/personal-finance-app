"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BudgetWithData } from "@/types/global";

export function ChartPieDonutText({
  budgets = [],
  totalSpent,
  totalLimit,
}: {
  budgets: BudgetWithData[];
  totalSpent: number;
  totalLimit: number;
}) {
  const chartData = budgets.map((b) => ({
    category: b.category,
    value: b.maximum,
    spent: b.spent,
    fill: b.theme,
  }));

  const chartConfig = Object.fromEntries(
    budgets.map((b) => [b.category, { label: b.category, color: b.theme }]),
  ) satisfies ChartConfig;

  return (
    <div>
      <CardHeader className="sr-only items-center pb-0">
        <CardTitle>Budget chart</CardTitle>
        <CardDescription>Showing spending summary</CardDescription>
      </CardHeader>

      <CardContent className="flex-none p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-65 w-65"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={67}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${totalSpent}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          of ${totalLimit} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}

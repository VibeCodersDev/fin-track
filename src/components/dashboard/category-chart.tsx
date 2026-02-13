"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

interface CategoryChartProps {
  data: Array<{
    category: { id: string; name: string; color: string | null } | undefined;
    total: number;
  }>;
}

const DEFAULT_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
];

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = data.map((item, i) => ({
    name: item.category?.name || "Unknown",
    value: item.total,
    color: item.category?.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
  }));

  const chartConfig: ChartConfig = {};
  chartData.forEach((item) => {
    chartConfig[item.name] = {
      label: item.name,
      color: item.color,
    };
  });

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No spending data available
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

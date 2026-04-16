"use client";

import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
export default function StatsPage() {
  const [entries] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return JSON.parse(localStorage.getItem("timelineEntries") || "[]");
  });
  const chartData = useMemo(() => {
    const callCount = entries.filter((entry) => entry.type === "Call").length;
    const textCount = entries.filter((entry) => entry.type === "Text").length;
    const videoCount = entries.filter((entry) => entry.type === "Video").length;
    return [
      { name: "Text", value: textCount, color: "#7C3AED" },
      { name: "Call", value: callCount, color: "#14532D" },
      { name: "Video", value: videoCount, color: "#22C55E" },
    ];
  }, [entries]);
  const totalInteractions = chartData.reduce((sum, item) => sum + item.value, 0);
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Friendship Analytics
        </h1>
        <div className="mt-8 card rounded-2xl bg-white shadow-sm">
          <div className="card-body p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-700">
              By Interaction Type
            </h2>
            <div className="mt-8 h-85 w-full">
              {totalInteractions === 0 ? (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-center">
                  <div>
                    <p className="text-base font-medium text-slate-700">
                      No interaction data yet
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Use Call, Text, or Video from the friend profile page to
                      generate analytics.
                    </p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={75}
                      outerRadius={105}
                      paddingAngle={6}
                      cornerRadius={8}
                      cx="50%"
                      cy="45%"
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "24px",
                        fontSize: "14px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
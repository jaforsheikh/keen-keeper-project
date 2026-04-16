"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
const EMPTY_ENTRIES = [];
let timelineCacheRaw = null;
let timelineCacheParsed = EMPTY_ENTRIES;
function subscribe(callback) {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("timeline-updated", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("timeline-updated", handler);
  };
}
function getServerSnapshot() {
  return EMPTY_ENTRIES;
}
function getClientSnapshot() {
  const raw = localStorage.getItem("timelineEntries") || "[]";
  if (raw === timelineCacheRaw) {
    return timelineCacheParsed;
  }
  timelineCacheRaw = raw;
  timelineCacheParsed = JSON.parse(raw);
  return timelineCacheParsed;
}
export default function StatsPage() {
  const entries = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
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
  const totalInteractions = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Friendship Analytics
        </h1>
        <div className="mt-6 card rounded-2xl bg-white shadow-sm sm:mt-8">
          <div className="card-body p-5 sm:p-6 lg:p-8">
            <h2 className="text-base font-semibold text-slate-700 sm:text-lg">
              By Interaction Type
            </h2>
            <div className="mt-6 h-65 w-full sm:mt-8 sm:h-80 lg:h-80">
              {totalInteractions === 0 ? (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center">
                  <div className="max-w-md">
                    <p className="text-sm font-medium text-slate-700 sm:text-base">
                      No interaction data yet
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
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
                      innerRadius={55}
                      outerRadius={85}
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
                        paddingTop: "20px",
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
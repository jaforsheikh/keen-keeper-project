"use client";
import { useMemo, useState } from "react";
import { Phone, MessageSquareText, Video } from "lucide-react";
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function getIcon(type) {
  if (type === "Call") {
    return <Phone size={22} className="text-red-500" />;
  }
  if (type === "Text") {
    return <MessageSquareText size={22} className="text-slate-700" />;
  }

  return <Video size={22} className="text-slate-700" />;
}
export default function TimelinePage() {
  const [entries] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return JSON.parse(localStorage.getItem("timelineEntries") || "[]");
  });
  const [filter, setFilter] = useState("All");
  const filteredEntries = useMemo(() => {
    if (filter === "All") {
      return entries;
    }
    return entries.filter((entry) => entry.type === filter);
  }, [entries, filter]);
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Timeline
        </h1>
        <div className="mt-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered w-full max-w-xs bg-white"
          >
            <option value="All">Filter timeline</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
        </div>
        <div className="mt-8 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="card bg-white shadow-sm">
              <div className="card-body items-center py-10 text-center">
                <p className="text-slate-500">No timeline entries yet.</p>
              </div>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="card rounded-2xl bg-white shadow-sm"
              >
                <div className="card-body flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    {getIcon(entry.type)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Phone, MessageSquareText, Video } from "lucide-react";

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

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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
  const [filter, setFilter] = useState("All");

  const entries = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const filteredEntries = useMemo(() => {
    if (filter === "All") {
      return entries;
    }

    return entries.filter((entry) => entry.type === filter);
  }, [entries, filter]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Timeline
        </h1>

        <div className="mt-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered w-full bg-white sm:max-w-xs"
          >
            <option value="All">Filter timeline</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
        </div>

        <div className="mt-8 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="card rounded-2xl bg-white shadow-sm">
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
                <div className="card-body flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    {getIcon(entry.type)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                      {entry.title}
                    </h3>

                    <div className="mt-1 flex flex-col text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-2">
                      <span>{formatDate(entry.date)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{formatTime(entry.date)}</span>
                    </div>
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
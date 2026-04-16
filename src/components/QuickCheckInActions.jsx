"use client";

import toast from "react-hot-toast";
import { Phone, MessageSquareText, Video } from "lucide-react";

export default function QuickCheckInActions({ friend }) {
  const addTimelineEntry = (type) => {
    const previousEntries = JSON.parse(
      localStorage.getItem("timelineEntries") || "[]"
    );
    const newEntry = {
      id: Date.now(),
      type,
      friendId: friend.id,
      friendName: friend.name,
      title: `${type} with ${friend.name}`,
      date: new Date().toISOString(),
    };
    const updatedEntries = [newEntry, ...previousEntries];
    localStorage.setItem("timelineEntries", JSON.stringify(updatedEntries));
    toast.success(`${type} logged for ${friend.name}`);
  };
  return (
    <div className="card rounded-2xl bg-white shadow-sm">
      <div className="card-body">
        <h2 className="text-lg font-semibold text-emerald-900">
          Quick Check-In
        </h2>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <button
            onClick={() => addTimelineEntry("Call")}
            className="btn h-24 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
          >
            <div className="flex flex-col items-center gap-2">
              <Phone size={24} />
              <span>Call</span>
            </div>
          </button>
          <button
            onClick={() => addTimelineEntry("Text")}
            className="btn h-24 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
          >
            <div className="flex flex-col items-center gap-2">
              <MessageSquareText size={24} />
              <span>Text</span>
            </div>
          </button>
          <button
            onClick={() => addTimelineEntry("Video")}
            className="btn h-24 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 sm:col-span-2 xl:col-span-1"
          >
            <div className="flex flex-col items-center gap-2">
              <Video size={24} />
              <span>Video</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
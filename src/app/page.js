"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "../components/HeroSection";

function getStatusClasses(status) {
  if (status === "on-track") {
    return "badge border-0 bg-emerald-900 text-white";
  }
  if (status === "almost due") {
    return "badge border-0 bg-amber-400 text-white";
  }
  return "badge border-0 bg-red-500 text-white";
}
export default function HomePage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("/data/friends.json", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch friends data");
        }
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);
  const stats = useMemo(() => {
    return {
      totalFriends: friends.length,
      onTrack: friends.filter((f) => f.status === "on-track").length,
      needAttention: friends.filter((f) => f.status !== "on-track").length,
      interactionsThisMonth: 12,
    };
  }, [friends]);
  return (
    <main className="min-h-screen bg-slate-100">
      <HeroSection
        totalFriends={stats.totalFriends}
        onTrack={stats.onTrack}
        needAttention={stats.needAttention}
        interactionsThisMonth={stats.interactionsThisMonth}
      />
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900">Your Friends</h2>
          {loading ? (
            <p className="mt-6 text-slate-500">Loading...</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {friends.map((friend) => (
                <Link
                  key={friend.id}
                  href={`/details/${friend.id}`}
                  className="card bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="card-body items-center text-center">
                    <Image
                      src={friend.picture}
                      alt={friend.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {friend.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {friend.days_since_contact}d ago
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {friend.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge border-0 bg-emerald-100 text-emerald-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <span className={getStatusClasses(friend.status)}>
                        {friend.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
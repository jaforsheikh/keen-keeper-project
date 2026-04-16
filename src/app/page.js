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

      <section className="px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Your Friends
          </h2>

          {loading ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="card bg-white shadow-sm">
                  <div className="card-body items-center text-center">
                    <div className="skeleton h-16 w-16 rounded-full sm:h-20 sm:w-20" />
                    <div className="mt-3 skeleton h-5 w-28" />
                    <div className="skeleton h-4 w-16" />
                    <div className="mt-3 flex gap-2">
                      <div className="skeleton h-5 w-14 rounded-full" />
                      <div className="skeleton h-5 w-16 rounded-full" />
                    </div>
                    <div className="mt-3 skeleton h-5 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {friends.map((friend) => (
                <Link
                  key={friend.id}
                  href={`/details/${friend.id}`}
                  className="card bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="card-body items-center text-center">
                    <Image
                      src={friend.picture}
                      alt={friend.name}
                      width={80}
                      height={80}
                      className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
                    />

                    <h3 className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">
                      {friend.name}
                    </h3>

                    <p className="text-xs text-slate-400">
                      {friend.days_since_contact}d ago
                    </p>

                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {friend.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge border-0 bg-emerald-100 text-[10px] uppercase text-emerald-700 sm:text-[11px]"
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

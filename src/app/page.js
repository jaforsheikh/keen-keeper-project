"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    const totalFriends = friends.length;
    const onTrack = friends.filter(
      (friend) => friend.status === "on-track"
    ).length;
    const needAttention = friends.filter(
      (friend) => friend.status !== "on-track"
    ).length;
    const interactionsThisMonth = 12;

    return {
      totalFriends,
      onTrack,
      needAttention,
      interactionsThisMonth,
    };
  }, [friends]);

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Friends to keep close in your life
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Your personal shelf of meaningful connections. Browse, tend, and
              nurture the relationships that matter most.
            </p>

            <button className="btn mt-6 border-0 bg-emerald-900 text-white hover:bg-emerald-800">
              + Add a Friend
            </button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card bg-white shadow-sm">
              <div className="card-body items-center py-8 text-center">
                <h3 className="text-3xl font-bold text-emerald-900">
                  {stats.totalFriends}
                </h3>
                <p className="mt-2 text-sm text-slate-500">Total Friends</p>
              </div>
            </div>

            <div className="card bg-white shadow-sm">
              <div className="card-body items-center py-8 text-center">
                <h3 className="text-3xl font-bold text-emerald-900">
                  {stats.onTrack}
                </h3>
                <p className="mt-2 text-sm text-slate-500">On Track</p>
              </div>
            </div>

            <div className="card bg-white shadow-sm">
              <div className="card-body items-center py-8 text-center">
                <h3 className="text-3xl font-bold text-emerald-900">
                  {stats.needAttention}
                </h3>
                <p className="mt-2 text-sm text-slate-500">Need Attention</p>
              </div>
            </div>

            <div className="card bg-white shadow-sm">
              <div className="card-body items-center py-8 text-center">
                <h3 className="text-3xl font-bold text-emerald-900">
                  {stats.interactionsThisMonth}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Interactions This Month
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">Your Friends</h2>

            {loading ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="card bg-white shadow-sm">
                    <div className="card-body items-center">
                      <div className="skeleton h-20 w-20 rounded-full" />
                      <div className="mt-4 skeleton h-4 w-28" />
                      <div className="skeleton h-3 w-16" />
                      <div className="mt-4 flex gap-2">
                        <div className="skeleton h-6 w-16 rounded-full" />
                        <div className="skeleton h-6 w-16 rounded-full" />
                      </div>
                      <div className="mt-4 skeleton h-6 w-20 rounded-full" />
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
                        className="h-20 w-20 rounded-full object-cover"
                      />

                      <h3 className="card-title mt-2 text-lg text-slate-900">
                        {friend.name}
                      </h3>

                      <p className="text-xs text-slate-400">
                        {friend.days_since_contact}d ago
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        {friend.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge border-0 bg-emerald-100 px-3 py-3 text-[11px] font-medium capitalize text-emerald-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4">
                        <span
                          className={`px-3 py-3 text-[11px] font-semibold capitalize ${getStatusClasses(
                            friend.status
                          )}`}
                        >
                          {friend.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
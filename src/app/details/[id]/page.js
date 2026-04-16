import Image from "next/image";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { BellRing, Archive, Trash2 } from "lucide-react";
import QuickCheckInActions from "../../../components/QuickCheckInActions";

async function getFriends() {
  const filePath = path.join(process.cwd(), "public", "data", "friends.json");
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}
function getStatusClasses(status) {
  if (status === "on-track") {
    return "badge border-0 bg-emerald-900 text-white";
  }
  if (status === "almost due") {
    return "badge border-0 bg-amber-400 text-white";
  }
  return "badge border-0 bg-red-500 text-white";
}
export default async function FriendProfilePage({ params }) {
  const resolvedParams = await params;
  const friendId = Number(resolvedParams.id);

  const friends = await getFriends();
  const friend = friends.find((item) => item.id === friendId);

  if (!friend) {
    notFound();
  }
  const formattedDate = new Date(friend.next_due_date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="card rounded-2xl bg-white shadow-sm">
              <div className="card-body items-center text-center">
                <Image
                  src={friend.picture}
                  alt={friend.name}
                  width={96}
                  height={96}
                  className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
                />
                <h1 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
                  {friend.name}
                </h1>
                <div className="mt-2">
                  <span className={getStatusClasses(friend.status)}>
                    {friend.status}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {friend.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge border-0 bg-emerald-100 px-3 py-2 text-[10px] font-medium uppercase text-emerald-700 sm:text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm italic leading-6 text-slate-500">
                  &ldquo;{friend.bio}&rdquo;
                </p>
                <p className="text-sm text-slate-400">Preferred: email</p>
              </div>
            </div>
            <button className="btn h-14 w-full justify-center rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50">
              <BellRing size={18} />
              Snooze 2 Weeks
            </button>
            <button className="btn h-14 w-full justify-center rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50">
              <Archive size={18} />
              Archive
            </button>
            <button className="btn h-14 w-full justify-center rounded-xl border border-red-200 bg-white text-red-500 hover:bg-red-50">
              <Trash2 size={18} />
              Delete
            </button>
          </div>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="card rounded-2xl bg-white shadow-sm">
                <div className="card-body items-center py-8 text-center">
                  <h2 className="text-3xl font-bold text-emerald-900 sm:text-4xl">
                    {friend.days_since_contact}
                  </h2>
                  <p className="text-sm text-slate-500 sm:text-base">
                    Days Since Contact
                  </p>
                </div>
              </div>
              <div className="card rounded-2xl bg-white shadow-sm">
                <div className="card-body items-center py-8 text-center">
                  <h2 className="text-3xl font-bold text-emerald-900 sm:text-4xl">
                    {friend.goal}
                  </h2>
                  <p className="text-sm text-slate-500 sm:text-base">
                    Goal (Days)
                  </p>
                </div>
              </div>
              <div className="card rounded-2xl bg-white shadow-sm sm:col-span-2 xl:col-span-1">
                <div className="card-body items-center py-8 text-center">
                  <h2 className="text-3xl font-bold text-emerald-900 sm:text-4xl">
                    {formattedDate}
                  </h2>
                  <p className="text-sm text-slate-500 sm:text-base">
                    Next Due
                  </p>
                </div>
              </div>
            </div>
            <div className="card rounded-2xl bg-white shadow-sm">
              <div className="card-body">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold text-emerald-900">
                    Relationship Goal
                  </h2>
                  <button className="btn btn-sm w-full rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 sm:w-auto">
                    Edit
                  </button>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                  Connect every{" "}
                  <span className="font-bold text-slate-900">
                    {friend.goal} days
                  </span>
                </p>
              </div>
            </div>
            <QuickCheckInActions friend={friend} />
          </div>
        </div>
      </div>
    </main>
  );
}

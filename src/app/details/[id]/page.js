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
    }
  );

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="card rounded-2xl bg-white shadow-sm">
              <div className="card-body items-center text-center">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="h-24 w-24 rounded-full object-cover"
                />

                <h1 className="mt-3 text-2xl font-bold text-slate-900">
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
                      className="badge border-0 bg-emerald-100 text-[11px] font-medium uppercase text-emerald-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm italic text-slate-500">
                  "{friend.bio}"
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
            <div className="grid gap-4 md:grid-cols-3">
              <div className="card rounded-2xl bg-white shadow-sm">
                <div className="card-body items-center py-8 text-center">
                  <h2 className="text-4xl font-bold text-emerald-900">
                    {friend.days_since_contact}
                  </h2>
                  <p className="text-slate-500">Days Since Contact</p>
                </div>
              </div>

              <div className="card rounded-2xl bg-white shadow-sm">
                <div className="card-body items-center py-8 text-center">
                  <h2 className="text-4xl font-bold text-emerald-900">
                    {friend.goal}
                  </h2>
                  <p className="text-slate-500">Goal (Days)</p>
                </div>
              </div>

              <div className="card rounded-2xl bg-white shadow-sm">
                <div className="card-body items-center py-8 text-center">
                  <h2 className="text-4xl font-bold text-emerald-900">
                    {formattedDate}
                  </h2>
                  <p className="text-slate-500">Next Due</p>
                </div>
              </div>
            </div>

            <div className="card rounded-2xl bg-white shadow-sm">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-emerald-900">
                    Relationship Goal
                  </h2>

                  <button className="btn btn-sm rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                    Edit
                  </button>
                </div>

                <p className="mt-2 text-slate-500">
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
export default function HeroSection({
  totalFriends,
  onTrack,
  needAttention,
  interactionsThisMonth,
}) {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Friends to keep close in your life
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-500">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>

          <button className="btn mt-8 border-0 bg-emerald-900 px-6 text-base font-semibold text-white hover:bg-emerald-800">
            + Add a Friend
          </button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-10 text-center">
              <h3 className="text-5xl font-bold text-emerald-900">
                {totalFriends}
              </h3>
              <p className="mt-3 text-xl text-slate-500">Total Friends</p>
            </div>
          </div>

          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-10 text-center">
              <h3 className="text-5xl font-bold text-emerald-900">
                {onTrack}
              </h3>
              <p className="mt-3 text-xl text-slate-500">On Track</p>
            </div>
          </div>







          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-10 text-center">
              <h3 className="text-5xl font-bold text-emerald-900">
                {needAttention}
              </h3>
              <p className="mt-3 text-xl text-slate-500">Need Attention</p>
            </div>
          </div>




          

          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-10 text-center">
              <h3 className="text-5xl font-bold text-emerald-900">
                {interactionsThisMonth}
              </h3>
              <p className="mt-3 text-xl text-slate-500">
                Interactions This Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
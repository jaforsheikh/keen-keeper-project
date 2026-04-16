export default function HeroSection({
  totalFriends,
  onTrack,
  needAttention,
  interactionsThisMonth,
}) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            Friends to keep close in your life
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-500 sm:mt-6 sm:text-base sm:leading-7 lg:text-xl lg:leading-8">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <button className="btn mt-6 border-0 bg-emerald-900 px-5 text-sm font-semibold text-white hover:bg-emerald-800 sm:mt-8 sm:px-6 sm:text-base">
            + Add a Friend
          </button>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-8 text-center sm:py-10">
              <h3 className="text-3xl font-bold text-emerald-900 sm:text-4xl lg:text-5xl">
                {totalFriends}
              </h3>
              <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base lg:text-xl">
                Total Friends
              </p>
            </div>
          </div>
          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-8 text-center sm:py-10">
              <h3 className="text-3xl font-bold text-emerald-900 sm:text-4xl lg:text-5xl">
                {onTrack}
              </h3>
              <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base lg:text-xl">
                On Track
              </p>
            </div>
          </div>
          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-8 text-center sm:py-10">
              <h3 className="text-3xl font-bold text-emerald-900 sm:text-4xl lg:text-5xl">
                {needAttention}
              </h3>
              <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base lg:text-xl">
                Need Attention
              </p>
            </div>
          </div>
          <div className="card rounded-2xl bg-white shadow-sm">
            <div className="card-body items-center py-8 text-center sm:py-10">
              <h3 className="text-3xl font-bold text-emerald-900 sm:text-4xl lg:text-5xl">
                {interactionsThisMonth}
              </h3>
              <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base lg:text-xl">
                Interactions This Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
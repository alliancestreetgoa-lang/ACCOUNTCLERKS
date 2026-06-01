export default function ResourcesLoading() {
  return (
    <>
      <div className="pt-[clamp(130px,18vh,200px)]" style={{ background: "linear-gradient(168deg, #20231F 0%, #0E1311 65%)" }}>
        <div className="wrap pb-[clamp(56px,9vh,110px)]">
          <div className="h-3 w-40 rounded bg-white/10" />
          <div className="mt-6 h-12 w-2/3 rounded bg-white/10" />
          <div className="mt-4 h-4 w-1/2 rounded bg-white/5" />
        </div>
      </div>
      <div className="wrap py-[clamp(72px,11vh,140px)]">
        <div className="h-12 w-full max-w-md rounded-full bg-neutral-100" />
        <div className="mt-5 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-neutral-100" />
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[22px] border border-[var(--hair-light)] bg-canvas p-6">
              <div className="h-6 w-20 rounded-full bg-neutral-100" />
              <div className="mt-4 h-5 w-5/6 rounded bg-neutral-100" />
              <div className="mt-2 h-4 w-full rounded bg-neutral-50" />
              <div className="mt-2 h-4 w-2/3 rounded bg-neutral-50" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

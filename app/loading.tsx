export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-neutral-200 border-t-evergreen-500" />
        <span className="text-[0.85rem] text-neutral-400">Loading…</span>
      </div>
    </div>
  );
}

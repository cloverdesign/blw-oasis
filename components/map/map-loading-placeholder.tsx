export function MapLoadingPlaceholder({
  className = "",
}: {
  className?: string
}) {
  return (
    <div
      className={`flex size-full items-center justify-center rounded-3xl bg-muted animate-pulse ${className}`}
      aria-hidden
    >
      <span className="text-muted-foreground text-sm">Loading map…</span>
    </div>
  )
}

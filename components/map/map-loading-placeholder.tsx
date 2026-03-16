export function MapLoadingPlaceholder({
  className = "",
}: {
  className?: string
}) {
  return (
    <div
      className={`flex size-full items-center justify-center rounded-3xl animate-pulse ${className}`}
      style={{ backgroundColor: "#262626" }}
      aria-hidden
    >
      <span className="text-muted-foreground text-sm">Loading map…</span>
    </div>
  )
}

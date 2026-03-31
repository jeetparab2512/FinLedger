import { cn } from "@/lib/utils"

/** Inline SVG mark for Ledger (bar-chart motif). */
export function AppLogo({
  size = 40,
  className,
  decorative = true,
}: {
  size?: number
  className?: string
  /** When false, exposes the mark to assistive tech (e.g. hero / auth pages). */
  decorative?: boolean
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0 rounded-lg shadow-sm", className)}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Ledger"}
    >
      <rect width="32" height="32" rx="8" fill="#4f46e5" />
      <path
        fill="white"
        fillOpacity={0.95}
        d="M8 22h3v6H8zm5-4h3v10h-3zm5-6h3v16h-3zm5-8h3v24h-3z"
      />
    </svg>
  )
}

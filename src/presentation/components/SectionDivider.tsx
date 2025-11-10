"use client"


interface SectionDividerProps {
  from?: string
  to?: string
  flip?: boolean
  className?: string
}

export function SectionDivider({ from = "transparent", to = "var(--background)", flip = false, className }: SectionDividerProps) {
  const rotationClass = flip ? "rotate-180" : ""
  const waveColor = flip ? from : to
  const classes = [
    "pointer-events-none relative w-full overflow-hidden leading-none",
    rotationClass,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div style={{backgroundColor: waveColor}}>
      <div aria-hidden className={`${classes} absolute -top-12`} >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block h-[72px] w-full relative"
        >
          <path
            d="M0 0 C 120 70 280 0 440 50 C 600 100 760 20 920 60 C 1040 90 1120 70 1200 40 L 1200 120 L 0 120 Z"
            fill={waveColor}
          />
        </svg>
      </div>
    </div>
  )
}

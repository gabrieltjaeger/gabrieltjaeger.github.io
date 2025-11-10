'use client'

import { colors } from "@/lib/theme/tokens"

export default function GridLayer() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute left-1/2 top-1/2 h-[140vh] w-[140vw]"
        style={{
          transform:
            "translate(-50%, -50%) perspective(1000px) rotateX(6deg) rotateZ(-2deg)",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          className="opacity-70"
          style={{ filter: "contrast(105%) brightness(90%)" }}
        >
          <defs>
            <pattern id="fine" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={colors.gridLine}
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id="coarse"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="url(#fine)" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke={colors.gridLineEmph}
                strokeWidth="1.25"
              />
            </pattern>
            <radialGradient id="fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#coarse)" />
          <rect width="100%" height="100%" fill="url(#fade)" />
        </svg>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { HeroContent } from "./hero/HeroContent"

interface HeroProps {
  name: string
  title: string
  taglines: string[]
  email: string
  github: string | null
  linkedin: string | null
  twitter: string | null
}

export function Hero({ name, title, taglines, email, github, linkedin, twitter }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 overflow-hidden mesh-bg">
      {/* Glassmorphism dots texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(217, 164, 65, 0.15) 1.5px, transparent 0)',
          backgroundSize: '36px 36px'
        }} />
      </div>
      
      {/* Engineer grid background with parallax and depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) rotate(-2deg) scale(1.1)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Grid layers for depth */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--base-salmon) 40%, transparent 60%) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--base-salmon) 40%, transparent 60%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        
        {/* Fine grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--base-moss) 50%, transparent 50%) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--base-moss) 50%, transparent 50%) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
        }} />

        {/* Accent lines (thicker) */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--base-amber) 60%, transparent 40%) 2px, transparent 2px),
            linear-gradient(to bottom, color-mix(in srgb, var(--base-amber) 60%, transparent 40%) 2px, transparent 2px)
          `,
          backgroundSize: '200px 200px',
        }} />

        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
      </div>

      {/* Floating 3D content container */}
      <HeroContent name={name} title={title} taglines={taglines} email={email} github={github} linkedin={linkedin} twitter={twitter} />
    </section>
  )
}

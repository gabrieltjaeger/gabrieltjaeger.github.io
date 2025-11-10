"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"

interface SocialLinksProps {
  email: string
  github: string | null
  linkedin: string | null
  twitter: string | null
  className?: string
}

export function SocialLinks({ email, github, linkedin, twitter, className = "" }: SocialLinksProps) {
  const socialLinks = [
    {
      icon: Mail,
      href: `mailto:${email}`,
      label: "Email",
      color: "hover:text-primary",
    },
    github && {
      icon: Github,
      href: github,
      label: "GitHub",
      color: "hover:text-accent",
    },
    linkedin && {
      icon: Linkedin,
      href: linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    twitter && {
      icon: Twitter,
      href: twitter,
      label: "Twitter",
      color: "hover:text-sky-500",
    },
  ].filter(Boolean)

  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((link) => {
        if (!link) return null
        const Icon = link.icon
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            className={`transition-colors duration-200 ${link.color}`}
            aria-label={link.label}
          >
            <Icon className="h-5 w-5" />
          </a>
        )
      })}
    </div>
  )
}

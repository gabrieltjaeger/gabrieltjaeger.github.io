"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useTranslations } from "next-intl"
import { ContactLink } from "./ContactLink"

interface ContactInformationProps {
  email: string
  github?: string
  linkedin?: string
  twitter?: string
}

export function ContactInformation({ email, github, linkedin, twitter }: ContactInformationProps) {
  const contactTranslations = useTranslations("Contact")
  const commonTranslations = useTranslations("Common")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{contactTranslations("information")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ContactLink
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            href={`mailto:${email}`}
            value={email}
          />
          {github && (
            <ContactLink
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              href={github}
              value={commonTranslations("github")}
            />
          )}
          {linkedin && (
            <ContactLink
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              href={linkedin}
              value={commonTranslations("linkedin")}
            />
          )}
          {twitter && (
            <ContactLink
              icon={<Twitter className="h-5 w-5" />}
              label="Twitter"
              href={twitter}
              value={commonTranslations("twitter")}
            />
          )}
          <div className="pt-4">
            <Button asChild className="w-full">
              <a href={`mailto:${email}`}>{commonTranslations("sendEmail")}</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

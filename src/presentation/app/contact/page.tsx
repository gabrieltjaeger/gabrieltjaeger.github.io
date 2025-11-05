import { defaultLocale } from "@/infra/adapters/i18n/config"
import { redirect } from "next/navigation"

export default function ContactPage() {
  redirect(`/${defaultLocale}/contact`)
}

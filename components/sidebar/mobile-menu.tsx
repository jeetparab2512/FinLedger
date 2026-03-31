"use client"

import { AppLogo } from "@/components/branding/app-logo"
import { useSidebar } from "@/components/ui/sidebar"
import config from "@/lib/config"
import Link from "next/link"

export default function MobileMenu({ unsortedFilesCount }: { unsortedFilesCount: number }) {
  const { toggleSidebar } = useSidebar()

  return (
    <menu className="flex flex-row gap-2 p-2 items-center justify-between fixed top-0 left-0 w-full z-50 border-b-2 border-solid bg-background md:hidden">
      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0"
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <AppLogo size={40} />
      </button>
      <Link href="/" className="text-lg font-bold">
        {config.app.title}
      </Link>
      <Link
        href="/unsorted"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
      >
        {unsortedFilesCount}
      </Link>
    </menu>
  )
}

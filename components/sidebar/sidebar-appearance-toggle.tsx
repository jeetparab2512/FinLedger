"use client"

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useSidebarAppearance } from "@/lib/sidebar-appearance-context"
import { Moon, Sun } from "lucide-react"

export function SidebarAppearanceToggle() {
  const { appearance, toggle } = useSidebarAppearance()
  const { open } = useSidebar()
  const isDark = appearance === "dark"

  return (
    <SidebarMenuItem>
      <SidebarMenuButton type="button" onClick={toggle} title={isDark ? "Use light sidebar" : "Use dark sidebar"}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {open ? <span>{isDark ? "Light sidebar" : "Dark sidebar"}</span> : null}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

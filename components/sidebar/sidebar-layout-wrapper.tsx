"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { STORAGE_KEY, SidebarAppearanceContext, type SidebarAppearance } from "@/lib/sidebar-appearance-context"
import { cn } from "@/lib/utils"
import * as React from "react"

/** Wraps `SidebarProvider` and applies sidebar-only dark tokens (main area stays light). */
export function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearanceState] = React.useState<SidebarAppearance>("light")
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (v === "dark" || v === "light") {
        setAppearanceState(v)
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  const setAppearance = React.useCallback((v: SidebarAppearance) => {
    setAppearanceState(v)
    try {
      localStorage.setItem(STORAGE_KEY, v)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = React.useCallback(() => {
    setAppearanceState((a) => {
      const next: SidebarAppearance = a === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const value = React.useMemo(
    () => ({
      appearance,
      setAppearance,
      toggle,
    }),
    [appearance, setAppearance, toggle]
  )

  return (
    <SidebarAppearanceContext.Provider value={value}>
      <SidebarProvider className={cn(hydrated && appearance === "dark" && "sidebar-theme-dark")}>
        {children}
      </SidebarProvider>
    </SidebarAppearanceContext.Provider>
  )
}

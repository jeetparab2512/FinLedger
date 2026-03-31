"use client"

import * as React from "react"

const STORAGE_KEY = "ledger-sidebar-appearance"

export type SidebarAppearance = "light" | "dark"

export type SidebarAppearanceContextValue = {
  appearance: SidebarAppearance
  setAppearance: (v: SidebarAppearance) => void
  toggle: () => void
}

export const SidebarAppearanceContext = React.createContext<SidebarAppearanceContextValue | null>(null)

export function useSidebarAppearanceOptional() {
  return React.useContext(SidebarAppearanceContext)
}

export function useSidebarAppearance() {
  const ctx = React.useContext(SidebarAppearanceContext)
  if (!ctx) {
    throw new Error("useSidebarAppearance must be used within SidebarLayoutWrapper")
  }
  return ctx
}

export { STORAGE_KEY }

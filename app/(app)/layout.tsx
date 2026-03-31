import { SubscriptionExpired } from "@/components/auth/subscription-expired"
import ScreenDropArea from "@/components/files/screen-drop-area"
import MobileMenu from "@/components/sidebar/mobile-menu"
import { AppSidebar } from "@/components/sidebar/sidebar"
import { SidebarLayoutWrapper } from "@/components/sidebar/sidebar-layout-wrapper"
import { SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { getCurrentUser, isSubscriptionExpired } from "@/lib/auth"
import config from "@/lib/config"
import { getUnsortedFilesCount } from "@/models/files"
import type { Metadata, Viewport } from "next"
import "../globals.css"
import { NotificationProvider } from "./context"

export const metadata: Metadata = {
  title: {
    template: "%s | Ledger",
    default: config.app.title,
  },
  description: config.app.description,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#4f46e5",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  const unsortedFilesCount = await getUnsortedFilesCount(user.id)

  const userProfile = {
    id: user.id,
    name: user.name || "",
    email: user.email,
    avatar: user.avatar ? user.avatar + "?" + user.id : undefined,
    membershipPlan: user.membershipPlan || "unlimited",
    storageUsed: user.storageUsed || 0,
    storageLimit: user.storageLimit || -1,
    aiBalance: user.aiBalance || 0,
  }

  return (
    <NotificationProvider>
      <ScreenDropArea>
        <SidebarLayoutWrapper>
          <MobileMenu unsortedFilesCount={unsortedFilesCount} />
          <AppSidebar
            profile={userProfile}
            unsortedFilesCount={unsortedFilesCount}
            isSelfHosted={config.selfHosted.isEnabled}
          />
          <SidebarInset className="w-full h-full mt-[60px] md:mt-0 overflow-auto">
            {isSubscriptionExpired(user) && <SubscriptionExpired />}
            {children}
          </SidebarInset>
        </SidebarLayoutWrapper>
        <Toaster />
      </ScreenDropArea>
    </NotificationProvider>
  )
}

export const dynamic = "force-dynamic"

"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function SignOutButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut()
        router.push("/")
        router.refresh()
      }}
      className="shrink-0 rounded-full border-2 border-border bg-surface px-4 py-2 text-sm font-bold hover:bg-background"
    >
      Sign out
    </button>
  )
}

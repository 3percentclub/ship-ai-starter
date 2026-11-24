"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

type Mode = "sign-up" | "sign-in"

export function AuthForm() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("sign-up")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)
    const form = new FormData(event.currentTarget)
    const email = String(form.get("email") ?? "")
    const password = String(form.get("password") ?? "")

    const result =
      mode === "sign-up"
        ? await authClient.signUp.email({ email, password, name: String(form.get("name") ?? "") })
        : await authClient.signIn.email({ email, password })

    setPending(false)
    if (result.error) {
      setError(
        mode === "sign-up"
          ? "Could not create that account. Try another email, and use 10+ characters for the password."
          : "That email and password did not match.",
      )
      return
    }
    router.push("/app")
    router.refresh()
  }

  const isSignUp = mode === "sign-up"

  return (
    <div className="flex flex-col gap-5 rounded-card border-2 border-border bg-surface p-6 shadow-block">
      <div className="flex gap-2 rounded-full border-2 border-border p-1" role="tablist" aria-label="Account">
        {(["sign-up", "sign-in"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => {
              setMode(value)
              setError(null)
            }}
            className={`flex-1 rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
              mode === value ? "bg-foreground text-surface" : "text-foreground hover:bg-background"
            }`}
          >
            {value === "sign-up" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignUp && (
          <Field label="Name" name="name" type="text" autoComplete="name" placeholder="Ada Lovelace" />
        )}
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="ada@example.com" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          minLength={10}
          hint={isSignUp ? "10 or more characters" : undefined}
        />
        {error && (
          <p role="alert" className="text-sm font-semibold text-primary">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border-2 border-border bg-primary px-5 py-3 font-bold text-primary-foreground shadow-block transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? "One sec..." : isSignUp ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  hint,
  ...input
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold">
      {label}
      <input
        required
        {...input}
        className="rounded-lg border-2 border-border bg-background px-3 py-2.5 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </label>
  )
}

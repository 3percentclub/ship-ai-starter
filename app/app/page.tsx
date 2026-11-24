import { redirect } from "next/navigation"
import { PlanForm } from "@/components/plan-form"
import { SignOutButton } from "@/components/sign-out-button"
import { SuggestionCard } from "@/components/suggestion-card"
import { asUser, type Suggestion } from "@/lib/db"
import { getSession } from "@/lib/session"

export default async function AppPage() {
  const session = await getSession()
  if (!session) redirect("/")

  // No WHERE clause on purpose: the row rule already limits this to your rows.
  const { rows } = await asUser(session.user.id, (db) =>
    db.query<Suggestion>(
      "select id, goal, answer, guardrail, created_at from suggestions order by created_at desc limit 50",
    ),
  )

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-8 px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Study Plan Coach</p>
          <p className="truncate text-sm text-muted">Signed in as {session.user.email}</p>
        </div>
        <SignOutButton />
      </header>

      <main className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h1 className="font-display text-3xl font-extrabold text-balance">What do you want to learn?</h1>
          <PlanForm />
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="saved-heading">
          <h2 id="saved-heading" className="font-display text-xl font-bold">
            Your saved plans
          </h2>
          {rows.length === 0 ? (
            <p className="rounded-card border-2 border-dashed border-border p-6 text-center text-muted">
              Nothing yet. Your plans show up here, and only you can see them.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {rows.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

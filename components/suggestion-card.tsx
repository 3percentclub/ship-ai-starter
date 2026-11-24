import type { Suggestion } from "@/lib/db"
import { DeleteButton } from "./delete-button"

export function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const redacted = [
    ...(suggestion.guardrail.redacted ?? []),
    ...(suggestion.guardrail.outputRedacted ?? []),
  ]

  return (
    <li className="flex flex-col gap-3 rounded-card border-2 border-border bg-surface p-5 shadow-block">
      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-lg font-bold leading-snug text-pretty">{suggestion.goal}</p>
        <DeleteButton id={suggestion.id} />
      </div>
      <p className="whitespace-pre-line leading-relaxed">{suggestion.answer}</p>
      {redacted.length > 0 && (
        <p className="text-xs font-semibold text-success">
          Guardrail removed: {Array.from(new Set(redacted)).join(", ")}
        </p>
      )}
    </li>
  )
}

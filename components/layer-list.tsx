const LAYERS = [
  { name: "Sign-in", file: "lib/auth.ts", what: "Better Auth, hashed passwords" },
  { name: "Row rules", file: "scripts/setup-db.mjs", what: "Postgres only returns your rows" },
  { name: "AI on the server", file: "app/api/plan/route.ts", what: "Key never reaches the browser" },
  { name: "Guardrail", file: "lib/guardrail.ts", what: "Checks text in and out" },
]

export function LayerList() {
  return (
    <ol className="flex flex-col gap-2">
      {LAYERS.map((layer, index) => (
        <li
          key={layer.name}
          className="flex items-center gap-3 rounded-card border-2 border-border bg-surface px-4 py-3 shadow-block"
        >
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
          >
            {index + 1}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-bold">
              {layer.name} <span className="font-normal text-muted">· {layer.what}</span>
            </span>
            <code className="truncate text-xs text-muted">{layer.file}</code>
          </span>
        </li>
      ))}
    </ol>
  )
}

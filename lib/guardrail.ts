/**
 * A small built-in guardrail so the starter works with zero setup.
 * It checks text on the way IN to the model and on the way OUT.
 *
 * Want a stronger one? Replace checkInput and checkOutput with calls to a
 * guardrail service such as Block Convey's PRISM. Keep the same return shape
 * and nothing else in the app has to change.
 */

export type GuardrailResult = {
  text: string
  blocked: boolean
  reason?: string
  redacted: string[]
}

const PERSONAL_INFO: { label: string; pattern: RegExp }[] = [
  { label: "email", pattern: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { label: "SSN", pattern: /\b\d{3}-\d{2}-\d{4}\b/g },
  { label: "card number", pattern: /\b(?:\d[ -]?){13,16}\b/g },
  { label: "phone", pattern: /(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}\b/g },
]

const INJECTION =
  /\b(ignore|forget|override|bypass)\b.{0,30}\b(rules|instructions|guardrails?|prompt)\b|\b(system prompt|developer mode|jailbreak)\b|\b(every|all|other) (users?|people|accounts?)('s)? (data|rows|plans|records)\b/i

const MAX_INPUT_LENGTH = 500

function redact(text: string) {
  const found: string[] = []
  let clean = text
  for (const { label, pattern } of PERSONAL_INFO) {
    clean = clean.replace(pattern, () => {
      if (!found.includes(label)) found.push(label)
      return `[${label} removed]`
    })
  }
  return { clean, found }
}

export function checkInput(raw: string): GuardrailResult {
  const text = raw.trim()

  if (!text) return { text, blocked: true, reason: "Type a goal first.", redacted: [] }
  if (text.length > MAX_INPUT_LENGTH) {
    return { text, blocked: true, reason: `Keep it under ${MAX_INPUT_LENGTH} characters.`, redacted: [] }
  }
  if (INJECTION.test(text)) {
    return {
      text,
      blocked: true,
      reason: "That looks like an attempt to get around the app's rules, so it was not sent to the AI.",
      redacted: [],
    }
  }

  const { clean, found } = redact(text)
  return { text: clean, blocked: false, redacted: found }
}

export function checkOutput(raw: string): GuardrailResult {
  const { clean, found } = redact(raw.trim())
  return { text: clean, blocked: false, redacted: found }
}

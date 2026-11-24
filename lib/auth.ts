import { betterAuth } from "better-auth"
import { pool } from "./db"

const toOrigin = (value?: string) =>
  value ? (value.startsWith("http") ? value : `https://${value}`) : undefined

const baseURL =
  process.env.BETTER_AUTH_URL ??
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  toOrigin(process.env.VERCEL_URL) ??
  process.env.V0_RUNTIME_URL

const trustedOrigins =
  process.env.NODE_ENV === "development"
    ? [
        "http://localhost:3000",
        process.env.V0_RUNTIME_URL,
        process.env.V0_DEV_APP_URL,
        process.env.V0_BUILD_URL,
        process.env.V0_SANDBOX_URL,
      ]
    : [toOrigin(process.env.VERCEL_URL), toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL)]

export const auth = betterAuth({
  database: pool,
  baseURL,
  trustedOrigins: trustedOrigins.filter((origin): origin is string => Boolean(origin)),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        advanced: {
          // Lets sign-in survive inside embedded previews (like v0) during development.
          // Production keeps Better Auth's stricter first-party cookie defaults.
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        },
      }
    : {}),
})

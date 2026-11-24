import { headers } from "next/headers"
import { auth } from "./auth"

/** Reads the signed-in user on the server. Returns null when nobody is signed in. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

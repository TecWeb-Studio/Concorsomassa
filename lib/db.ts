import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

function createTursoClient() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set in environment variables')
  }
  if (!authToken) {
    throw new Error('TURSO_AUTH_TOKEN is not set in environment variables')
  }

  return createClient({ url, authToken })
}

// Singleton pattern per evitare connessioni multiple in sviluppo (Next.js hot-reload)
declare global {
  // eslint-disable-next-line no-var
  var __tursoClient: ReturnType<typeof createTursoClient> | undefined
}

const client =
  globalThis.__tursoClient ?? (globalThis.__tursoClient = createTursoClient())

export const db = drizzle(client, { schema })
export type DB = typeof db

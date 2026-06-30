import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'

// Carica .env.local (e gli altri file .env di Next.js) anche per drizzle-kit
loadEnvConfig(process.cwd())

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config

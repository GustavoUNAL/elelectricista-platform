/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL absoluta del endpoint JSON (opcional). Si no existe, se usa la misma origen + base + api/visits */
  readonly VITE_VISIT_COUNTER_URL?: string
}

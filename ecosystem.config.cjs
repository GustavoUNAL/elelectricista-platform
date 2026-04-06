// PM2: `npm ci && npm run build` y luego `pm2 start ecosystem.config.cjs`
// Sirve `dist/` + GET /api/visits (contador en `data/visits.json`).
// Puerto 4174: NO uses 4173 en producción — es el de `vite preview` (SPA sin API).
module.exports = {
  apps: [
    {
      name: 'elelectricista-platform',
      cwd: __dirname,
      script: './server/static-serve.mjs',
      interpreter: 'node',
      instances: 1,
      autorestart: true,
      max_memory_restart: '250M',
      env: {
        PORT: 4174,
      },
    },
  ],
}

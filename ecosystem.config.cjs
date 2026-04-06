// PM2: `npm ci && npm run build` y luego `pm2 start ecosystem.config.cjs`
// Sirve `dist/` + API `/api/visits` (contador en `data/visits.json`).
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
        PORT: 4173,
      },
    },
  ],
}

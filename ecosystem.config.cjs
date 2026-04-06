// PM2: `npm run build` primero, luego `pm2 start ecosystem.config.cjs`
module.exports = {
  apps: [
    {
      name: 'elelectricista-platform',
      cwd: __dirname,
      script: './node_modules/serve/build/main.js',
      args: ['dist', '-s', '-l', 'tcp://0.0.0.0:4173'],
      interpreter: 'node',
      instances: 1,
      autorestart: true,
      max_memory_restart: '250M',
    },
  ],
}

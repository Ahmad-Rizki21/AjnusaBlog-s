module.exports = {
  apps: [
    {
      name: 'ajnusa-website',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/www/wwwroot/ajnusa-website',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/www/wwwroot/ajnusa-website/logs/err.log',
      out_file: '/www/wwwroot/ajnusa-website/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'app.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      // Todas as variáveis virão do arquivo .env (dotenv)
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};

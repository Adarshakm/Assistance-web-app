import { defineConfig, createLogger } from 'vite';
import react from '@vitejs/plugin-react';

const customLogger = createLogger();
const originalError = customLogger.error.bind(customLogger);

customLogger.error = (msg, options) => {
  const errText = typeof msg === 'string' ? msg : '';
  const errCode = options?.error?.code || '';
  // Suppress transient proxy connection errors when backend is restarting or offline
  if (
    errCode === 'ECONNREFUSED' ||
    errCode === 'ECONNRESET' ||
    errCode === 'EPIPE' ||
    errText.includes('ECONNREFUSED') ||
    errText.includes('ECONNRESET') ||
    errText.includes('EPIPE')
  ) {
    return;
  }
  originalError(msg, options);
};

export default defineConfig({
  customLogger,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


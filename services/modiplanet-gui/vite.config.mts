import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const alias = (target: string) => path.resolve(dirname, target);

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_']);
  const reactAppEnv = env.REACT_APP_ENV ?? process.env.REACT_APP_ENV ?? mode;
  const nodeEnv = command === 'serve' ? 'development' : 'production';

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@src': alias('src'),
        '@shared': alias('src/shared'),
        '@components': alias('src/components'),
        '@hooks': alias('src/components/hooks'),
        '@lib': alias('src/lib'),
        '@services': alias('src/services'),
        events: 'events/',
      },
    },
    define: {
      'process.env': JSON.stringify({
        ...env,
        NODE_ENV: nodeEnv,
        REACT_APP_ENV: reactAppEnv,
      }),
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
    build: {
      outDir: 'build',
      cssCodeSplit: false,
      sourcemap: process.env.GENERATE_SOURCEMAP === 'true' ? 'hidden' : false,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
      exclude: ['node_modules', 'build'],
    },
  };
});

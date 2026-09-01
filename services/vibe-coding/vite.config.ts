import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Standalone vibe-coding app. Consumes @luxrobo/ai-lab as source, so:
//  - svgr must process the package's `*.svg?react` imports
//  - optimizeDeps excludes the workspace package (process its TS source, don't pre-bundle)
//  - process.env is injected the same way the LMS app does it, and REACT_APP_APP is
//    pinned to 'vibe' so the package's routes mount at root (AILAB_BASE = '').
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_']);
  const reactAppEnv = env.REACT_APP_ENV ?? process.env.REACT_APP_ENV ?? mode;
  const nodeEnv = command === 'serve' ? 'development' : 'production';

  return {
    plugins: [react(), svgr({ include: '**/*.svg?react' })],
    define: {
      'process.env': JSON.stringify({
        ...env,
        NODE_ENV: nodeEnv,
        REACT_APP_ENV: reactAppEnv,
        REACT_APP_APP: 'vibe',
      }),
    },
    optimizeDeps: { exclude: ['@luxrobo/ai-lab'] },
    server: { host: '0.0.0.0', port: 3100, fs: { allow: ['../..'] } },
    preview: { host: '0.0.0.0', port: 3100 },
    build: { outDir: 'build', cssCodeSplit: false },
  };
});

import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import { AILab } from '@luxrobo/ai-lab';
import HeaderLayout from './HeaderLayout';

// Immersive chat view is heavy → lazy. Mounted at `/:slug` (e.g. /vibe-coding).
const ModuleDetail = lazy(() =>
  import('@luxrobo/ai-lab').then((m) => ({ default: m.ModuleDetail })),
);

export default function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route index element={<AILab />} />
          <Route path=":slug" element={<ModuleDetail />} />
        </Route>
        {/* Unknown paths → landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </NextUIProvider>
  );
}

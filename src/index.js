import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';
import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';

const AppRoot = document.getElementById('app-root-2023-tir_report');
if (AppRoot) {
  const root = createRoot(AppRoot);
  root.render(<App />);
}

const containerFigure1 = document.getElementById('app-root-2023-tir_report_figure1');
if (containerFigure1) {
  const root = createRoot(containerFigure1);
  root.render(<Figure1 />);
}

const containerFigure2 = document.getElementById('app-root-2023-tir_report_figure2');
if (containerFigure2) {
  const root = createRoot(containerFigure2);
  root.render(<Figure2 />);
}

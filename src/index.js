import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';
import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';
import Figure3 from './jsx/Figure3.jsx';
import Table1 from './jsx/Table1.jsx';

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

const containerFigure3 = document.getElementById('app-root-2023-tir_report_figure3');
if (containerFigure3) {
  const root = createRoot(containerFigure3);
  root.render(<Figure3 />);
}

const containerTable1 = document.getElementById('app-root-2023-tir_report_table1');
if (containerTable1) {
  const root = createRoot(containerTable1);
  root.render(<Table1 />);
}

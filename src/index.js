import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // React 18에서는 createRoot를 사용합니다.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

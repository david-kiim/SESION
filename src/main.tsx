import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import App from './App';
import Admin from './admin/Admin';

const isAdmin =
  window.location.pathname.replace(/\/+$/, '') === '/admin' ||
  new URLSearchParams(window.location.search).get('admin') !== null;

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isAdmin ? <Admin /> : <App />}</StrictMode>,
);

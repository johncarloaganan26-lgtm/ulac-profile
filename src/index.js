import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TurnstileGate from './TurnstileGate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TurnstileGate>
      <App />
    </TurnstileGate>
  </React.StrictMode>
);
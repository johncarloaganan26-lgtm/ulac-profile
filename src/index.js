import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import './index.css';
import App from './App';
import TurnstileGate from './TurnstileGate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <TurnstileGate>
        <App />
      </TurnstileGate>
    </MotionConfig>
  </React.StrictMode>
);
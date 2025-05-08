import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ValidationProvider } from './ValidationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ValidationProvider>
      <App />
    </ValidationProvider>
  </React.StrictMode>
);
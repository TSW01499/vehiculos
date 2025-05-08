import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ValidationProvider } from './ValidationContext';

ReactDOM.render(
  <React.StrictMode>
    <ValidationProvider>
      <App />
    </ValidationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
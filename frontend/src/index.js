import React from 'react';
import ReactDOM from 'react-dom/client';  // Changed to 'react-dom/client' in React 18
import App from './App';

// Create a root element for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render() instead of ReactDOM.render() in React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



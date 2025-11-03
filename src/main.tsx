import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Vite handles the .tsx extension

// Find the 'root' div in index.html
const rootElement = document.getElementById('root');

// Add a null check and type assertion for TypeScript
if (rootElement) {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element. Check your index.html file.");
}

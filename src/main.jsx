import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // We'll create this file next

// Find the 'root' div in index.html and render our App component inside it.
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element. Check your index.html file.");
}

// Import necessary libraries
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the main App component
import './global.css'; // Import global styles

// Render the App component into the root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the id in your index.html
);
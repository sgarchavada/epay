// src/index.js
import React from 'react';
import { createRoot } from "react-dom/client";
import { EPay } from './EPay';

// Attach component to window for global access
window.EPay = EPay;

// Optional: Helper function to render the component
window.renderEPay = (props) => {
  const container = document.createElement('div');
  container.id = 'epay-container'
  document.body.appendChild(container)

  const handleOnClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    root.unmount();
    document.body.removeChild(container);
  };

  // Create a root and render the EPay component
  const root = createRoot(container)
  root.render(<EPay {...props} onClose={handleOnClose} />)
};
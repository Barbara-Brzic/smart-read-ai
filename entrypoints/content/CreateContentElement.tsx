import React, { JSX } from 'react';
import ReactDOM from 'react-dom/client';

export const CreateContentElement = (
  uiContainer: HTMLElement,
  callback: (root: ReactDOM.Root) => JSX.Element
): ReactDOM.Root => {
  uiContainer.innerHTML = '';

  // Create app container with dark mode
  const app = document.createElement('div');
  app.className = 'dark';
  uiContainer.appendChild(app);

  const root = ReactDOM.createRoot(app);
  root.render(<React.StrictMode>{callback(root)}</React.StrictMode>);

  return root;
};

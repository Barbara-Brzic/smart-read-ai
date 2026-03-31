import React, { JSX } from 'react';
import ReactDOM from 'react-dom/client';

export const CreateContentElement = (
  uiContainer: HTMLElement,
  position: { x: number; y: number },
  callback: (root: ReactDOM.Root) => JSX.Element,
  onRemove?: () => void
): ReactDOM.Root => {
  uiContainer.innerHTML = '';

  // Create backdrop overlay
  const backdrop = document.createElement('div');
  Object.assign(backdrop.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '10000',
  });

  // Close modal when clicking backdrop
  backdrop.addEventListener('click', () => {
    if (onRemove) onRemove();
  });

  // Create app container with dark mode
  const app = document.createElement('div');
  app.className = 'dark';

  // Position the app container at click position
  Object.assign(app.style, {
    position: 'absolute',
    left: `${position?.x || 0}px`,
    top: `${position?.y || 0}px`,
  });

  // Prevent clicks on modal content from closing it
  app.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  backdrop.appendChild(app);
  uiContainer.appendChild(backdrop);

  const root = ReactDOM.createRoot(app);
  root.render(<React.StrictMode>{callback(root)}</React.StrictMode>);

  return root;
};

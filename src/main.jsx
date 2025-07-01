import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const Root = () => {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const handleMouseMove = (e) => {
        rootElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        rootElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      };

      rootElement.addEventListener('mousemove', handleMouseMove);

      return () => {
        rootElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
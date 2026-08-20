import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './utils/antiInspect'; // anti-inspection guard (right-click, F12, console, DevTools)
import App from './App';
import { AuthProvider } from './context/AuthContext';

// GitHub Pages serves the app from a sub-path (https://<user>.github.io/Bookstore_user/).
// Give React Router a basename ONLY there so routes also keep working at the site
// root on localhost / Netlify / Render.
const isGithubPages = window.location.hostname.endsWith('github.io');
const basename = isGithubPages ? '/Bookstore_user' : '';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

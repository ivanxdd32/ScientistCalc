import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/App.css';
import './Styles/Header.css';
import './Styles/Body.css';
import './Styles/Footer.css';
import './Styles/ScientistMode.css';
import App from './App.jsx';
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

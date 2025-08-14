import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppContextProvider from './context/AppContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

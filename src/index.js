import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {ContextProvider} from "./Context"
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>
);


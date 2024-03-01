import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import router from './components/routes';
import App from './App';


ReactDOM.render(
  // <React.StrictMode>
    <HashRouter>
    {/* <HashRouter router={router} /> */}
    <App />
    </HashRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

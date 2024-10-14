import "./assets/index.scss";
import {HashRouter} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import App from '/App.tsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_DEPLOY_BASE_URL;

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
    // <React.StrictMode>
    <HashRouter>
        <App/>
    </HashRouter>
    // </React.StrictMode>
);

reportWebVitals();

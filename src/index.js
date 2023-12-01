import "./assets/index.scss";
import {HashRouter} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <HashRouter>
        <App/>
    </HashRouter>
    // </React.StrictMode>
);

reportWebVitals();

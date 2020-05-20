import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AdminProvider from "./store/AdminProvider/AdminProvider";

ReactDOM.render(
    <AdminProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </AdminProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
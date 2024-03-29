import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "./store/createStore";
import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();
root.render(
    <Provider store={store}>
        <Router history={history}>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

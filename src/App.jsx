import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./components/catalog/catalog";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navBar";

function App() {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/catalog" component={Catalog} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;

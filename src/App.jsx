import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./components/layout/catalog";
import Main from "./components/pages/main/main";
import NavBar from "./components/ui/navBar/navBar";

function App() {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/catalog/:mangaName?" component={Catalog} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./components/layout/catalog";
import Main from "./components/pages/main/main";
import Reader from "./components/pages/readerPage/readerPage";

function App() {
    return (
        <div className="container">
            <Switch>
                <Route path="/catalog/:mangaName?" component={Catalog} />
                <Route
                    path="/reader/:mangaName?/:ch?/:page?"
                    component={Reader}
                />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;

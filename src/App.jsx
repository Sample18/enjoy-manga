import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./components/layout/catalog";
import GenresPage from "./components/pages/genresPage/genresPage";
import MainPage from "./components/pages/mainPage/mainPage";
import PageNotFound from "./components/pages/pageNotFound/pageNotFound";
import Reader from "./components/pages/readerPage/readerPage";

function App() {
    return (
        <div className="container">
            <Switch>
                <Route path="/genres" component={GenresPage} />
                <Route path="/catalog/:mangaName?" component={Catalog} />
                <Route path="/reader/:mangaName/:ch/:page" component={Reader} />
                <Route path="/404" component={PageNotFound} />
                <Route path="/" exact component={MainPage} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default App;

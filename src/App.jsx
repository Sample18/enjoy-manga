import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./layout/catalog";
import Genres from "./layout/genres";
import MainPage from "./layout/mainPage/mainPage";
import PageNotFound from "./components/pages/pageNotFound/pageNotFound";
import Reader from "./layout/reader";
import ProductProvider from "./hooks/useProduct";
import { ToastContainer } from "react-toastify";
import GenresProvider from "./hooks/useGenres";
import ChaptersProvider from "./hooks/useChapters";

function App() {
    return (
        <div className="container">
            <ProductProvider>
                <GenresProvider>
                    <ChaptersProvider>
                        <Switch>
                            <Route
                                path="/genres/:genreName?"
                                component={Genres}
                            />
                            <Route
                                path="/catalog/:mangaName?"
                                component={Catalog}
                            />
                            <Route
                                path="/reader/:mangaName/:ch/:page"
                                component={Reader}
                            />
                            <Route path="/404" component={PageNotFound} />
                            <Route path="/" exact component={MainPage} />
                            <Redirect to="/404" />
                        </Switch>
                    </ChaptersProvider>
                </GenresProvider>
            </ProductProvider>
            <ToastContainer />
        </div>
    );
}

export default App;

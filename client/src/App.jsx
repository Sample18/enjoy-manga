import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./layout/catalog";
import Genres from "./layout/genres";
import MainPage from "./layout/mainPage/mainPage";
import PageNotFound from "./components/pages/pageNotFound";
import Reader from "./layout/reader";
import { ToastContainer } from "react-toastify";
import Download from "./layout/download";
import Login from "./layout/login";
import LogOut from "./layout/logout";
import AppLoader from "./components/ui/hoc/appLoader";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./components/pages/profilePage";
import Authors from "./layout/authors";

function App() {
    return (
        <>
            <AppLoader>
                <Switch>
                    <Route path="/profile/:userId" component={ProfilePage} />
                    <Route path="/genres/:genreName?" component={Genres} />
                    <Route path="/catalog/:mangaName?" component={Catalog} />
                    <Route path="/authors" component={Authors} />
                    <Route
                        path="/reader/:mangaName/:ch/:page"
                        component={Reader}
                    />
                    <Route
                        path="/download/:createManga?"
                        component={Download}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/404" component={PageNotFound} />
                    <Route path="/" exact component={MainPage} />
                    <Redirect to="/404" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;

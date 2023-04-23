import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Catalog from "./layout/catalog";
import Genres from "./layout/genres";
import Main from "./layout/main";
import PageNotFound from "./components/pages/pageNotFound";
import Reader from "./layout/reader";
import { ToastContainer } from "react-toastify";
import Download from "./layout/download";
import Login from "./layout/login";
import LogOut from "./layout/logout";
import AppLoader from "./components/hoc/appLoader";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./components/pages/profilePage";
import Authors from "./layout/authors";
import ProtectedRoute from "./components/common/protectedRoute";
import Footer from "./components/ui/footer";
import NavBar from "./components/ui/navBar";

function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/genres/:genreName?" component={Genres} />
                    <Route path="/catalog/:mangaName?" component={Catalog} />
                    <Route path="/authors" component={Authors} />
                    <Route
                        path="/reader/:mangaName/:ch/:page"
                        component={Reader}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/404" component={PageNotFound} />
                    <Route path="/" exact component={Main} />
                    <ProtectedRoute
                        path="/profile/:userId"
                        component={ProfilePage}
                    />
                    <ProtectedRoute
                        path="/download/:createManga?"
                        component={Download}
                    />
                    <Redirect to="/404" />
                </Switch>
                <Footer />
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;

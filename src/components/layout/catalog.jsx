import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../pages/catalogPage/catalogPage";
import MangaPage from "../pages/mangaPage/mangaPage";
import NavBar from "../ui/navBar/navBar";

const Catalog = () => {
    const { mangaName } = useParams();
    return (
        <>
            <NavBar />
            {mangaName ? <MangaPage mangaName={mangaName} /> : <CatalogPage />}
        </>
    );
};

export default Catalog;

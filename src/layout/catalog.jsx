import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../components/pages/catalogPage";
import MangaPage from "../components/pages/mangaPage/mangaPage";
import NavBar from "../components/ui/navBar/navBar";

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

import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../pages/catalogPage/catalogPage";
import MangaPage from "../pages/mangaPage/mangaPage";

const Catalog = () => {
    const { mangaName } = useParams();
    return mangaName ? <MangaPage mangaName={mangaName} /> : <CatalogPage />;
};

export default Catalog;
